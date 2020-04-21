'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE;
let dynamoDB;

// sls dynamodb install

if(IS_OFFLINE) {
  dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1", endpoint:"http://localhost:8000"})
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}


app.use(bodyParser.urlencoded({extended: true}));

app.post('/users', (req, res) =>{
  const { userId, name  } = req.body;
  
  const params = {
    TableName : USERS_TABLE,
    Item: {
      userId, name
    }
  }

  dynamoDB.put( params, error => {
    if(error) {
      console.log(error)
      return res.status(500).json({
        error: "The user cannot be saved"
      })
    } else {
      res.status(200).json({ userId, name  });
    }
  } )

  
});

app.get('/users', (req, res) => {
  const params = {
    TableName : USERS_TABLE
  }

  dynamoDB.scan(params, (error, result ) => {
    if(error) {
      console.log(error)
      return res.status(500).json({
        error: "The user cannot be saved"
      })
    } else {
      res.status(200).json({ success: true, users: result.Items  });
    }
  })

});


app.get('/users/:id', (req,res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.id
    }
  }

  dynamoDB.get(params, (error, result) => {
    if(error) {
      console.log(error)
      return res.status(500).json({
        error: "The user cannot be retrieved"
      })
    } else {
      if(result.Item) {
        res.status(200).json({ success: true, user: result.Item  });
      } else {
        res.status(404).json({ success: false, message: 'The user was not found.'  });
      }
      
    }
  })

});

app.get('/', (req, res) => {
  res.send('Hello World from Express');
});

module.exports.generic = serverless(app);




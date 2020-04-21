'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE;

let options = {}

if(IS_OFFLINE) {
  options.region = "localhost"
  options.endpoint = "http://localhost:8000"
}
// sls dynamodb install

const dynamoDB=new AWS.DynamoDB.DocumentClient(options);

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  //res.send('Hello World from Express');
  res.status(200).json({ IS_OFFLINE })
});


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
        error: "The users cannot be retrieved"
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



module.exports.generic = serverless(app);




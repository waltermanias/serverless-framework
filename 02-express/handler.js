'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

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

})

app.get('/', (req, res) => {
  res.send('Hello World from Express');
});

module.exports.generic = serverless(app);




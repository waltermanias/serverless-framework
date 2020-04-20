'use strict';

const queryString = require('querystring');

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        id: event.pathParameters.id,
        name: 'walter.manias'
      },
      null,
      2
    ),
  };




  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.save = async event => {

  const body = queryString.parse(event['body'] );
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        httpStatus: 201,
        data: {
          id: 100,
          name: body.name
        }
      },
      null,
      2
    ),
  };


}
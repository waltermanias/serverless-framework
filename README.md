# serverless-framework

## Installing

Installing the package globally.

`npm install -g serverless`

Configuring the AWS credentials

`sls config credentials --provider aws --key [YOUR_KEY_HERE] --secret [YOUR_SECRET_HERE]`

You can check your credentials in the next file:

`~/.aws/credentials`

## Boilerplate

The next command will create your boilerplate base on the aws template with NodeJS.

`sls create -t aws-nodejs -n curso-sls-hello-world`

## Deploy

`sls deploy`



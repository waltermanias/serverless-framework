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

Deploy all functions

`sls deploy`

Deploy one function

`sls deploy -f hello -s dev`

## Useful commands

Invoke the function from the terminal.

`sls invoke -f hello -s dev`

Invoke the function locally from the terminal.

`sls invoke local -f hello -s dev`

Send data through the event

`sls invoke local -f hello -s dev -d '{"message": "Hello"}'`


## Remove all resources

`sls remove`

## Emulate API Gateway

https://github.com/waltermanias/serverless-framework/blob/master/README.md

`npm install --save serverless-offiline`

Run the server

`sls offline`

## Update your NodeJS version

Use n module from npm in order to upgrade node

`sudo npm cache clean -f`
`sudo npm install -g n`
`sudo n stable`

To upgrade to latest version (and not current stable) version, you can use

`sudo n latest`


## Optimize dependencies

`npm install serverless-plugin-include-dependencies --save-dev`
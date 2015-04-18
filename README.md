# API

This project can be used to quickly start your application.

## Pre requisite

Node must be installed

`~/.secret/skeleton-api.json` may contain private keys:

    {
      "dev": {
        "password": "foo"
      },
      "prod": {
        "password": "bar"
      }
    }

## Installation

run `npm install`.

## Run

run `gulp`. 

Check the server is running: `http 127.0.0.1:3000/status`

## API

### users

#### Create a new user

POST `http 127.0.0.1:3000/api/users/register email=foo@me.com password=Foo$Bar`. 

returns `200` if the email is not already used

#### Login

POST `http 127.0.0.1:3000/api/users/login email=foo@me.com password=Foo$Bar`.

returns `{ token: ACCESS_TOKEN }` if the credentials match a user in the db.

## License

MIT
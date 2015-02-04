# API

## Pre requisite

Node must be installed

`~/.secret/skeleton-api.json` must be created with content:

    {
      "dev": {
        "password": "foo"
      },
      "prod": {
        "password": "bar"
      }
    }

## Installation

run `npm install`

## Run

run `gulp`. Check the server is running: `curl 127.0.0.1:3000/api/hello`
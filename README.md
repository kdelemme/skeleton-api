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

## Deployment (Ansible)

Add your server address in the `hosts` file.

Create a `appadmin` user on your server.

create a ssh key and set the newly created public key in the remote `/home/appadmin/.ssh/authorized_keys` file.

Test your servers are reachable by running: `ansible all -m ping -i vars --private-key ~/.ssh/appadmin.remote.rsa -vvvv`

Create the ansible vault: `ansible-vault create vars/private.yml`. 
Enter a password, then create a file containing the password outside of your project, e.g: `echo MyPassword > ~/.secret/vault-password.txt`.
You can now add your private variables: `ansible-vault edit vars/private.yml --vault-password-file ~/.secret/vault-password.txt` (cf private.template.yml for example).

Deploy: `ansible-playbook deploy.yml -i vars --vault-password-file ~/.secret/vault-password.txt --private-key ~/.ssh/appadmin.remote.rsa -vvvv`


## API

### users

#### Create a new user

POST `http 127.0.0.1:3000/api/users/register email=foo@me.com password=Foo$Bar`. 

returns `200` if the email is not already used

#### Login

POST `http 127.0.0.1:3000/api/users/login email=foo@me.com password=Foo$Bar`.

returns `{ token: ACCESS_TOKEN }` if the credentials match a user in the db.

## License

The MIT License (MIT)

Copyright (c) 2015 Kevin Delemme (kdelemme@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
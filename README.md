# API

This project can be used to quickly start a nodejs application deployed with ansible.

## Pre requisite

- node >= v4.0.0
- gulp
- ansible

## Installation

run `npm install`

## Run

run `gulp`. 

Check the server is running: `http 127.0.0.1:3000/status`

## Deployment (Ansible)


### Configure your local env

Create the ansible vault: `ansible-vault create deployment/vars/private.yml`. 
Enter a password, then create a file containing the password outside of your project, e.g: `echo MyPassword > ~/.secret/vault-password.txt`.

You can now add your private variables into the ansible vault with `ansible-vault edit deployment/vars/private.yml --vault-password-file ~/.secret/vault-password.txt` (cf deployment/vars/private.template.yml for example).


### Configure your server

Create a `appadmin` user.

Generate a new SSH key `appadmin.remote` and put it into `/home/appadmin/.ssh/authorized_keys`.

Install supervisor on your server. Make sure `appadmin` has the right permission to use it.

Create a folder `/var/apps` and give access to your `appadmin` user.

Test your servers are reachable by running: `ansible all -m ping -i vars --private-key ~/.ssh/appadmin.remote.rsa -vvvv`


### Deploy

Deploy: `ansible-playbook deployment/deploy.yml -i deployment/vars --vault-password-file ~/.secret/vault-password.txt --private-key ~/.ssh/appadmin.remote.rsa -vvvv`

Check your nodejs app is running: `curl http://SERVER_IP:4000/status`

## License

The MIT License (MIT)

Copyright (c) 2015 Kevin Delemme (kdelemme@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
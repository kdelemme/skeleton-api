'use strict';
var path = require('path');
var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var secret = require(path.join(HOME, '.secret/skeleton-api.json'));

module.exports = {
  dev: {
    port: 3030,
    database: {
      client: 'pg',
      connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'db_dev'
      }
    }
  },
  prod: {
    port: 4000,
    database: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db_prod'
      }
    }
  }
};
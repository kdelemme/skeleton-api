'use strict';
var path = require('path');
var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var secret = require(path.join(HOME, '.secret/skeleton-api.json'));

module.exports = {
  dev: {
    port: 3000,
    password: secret.dev.password
  },
  prod: {
    port: 4000,
    password: secret.prod.password
  }
};
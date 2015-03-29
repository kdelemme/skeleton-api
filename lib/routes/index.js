"use strict";
var express = require('express');
var directives = require('../directives');

module.exports = function(config, knexClient) {
  var router = express.Router();
  var tokenService = directives.token(knexClient);

  router.use('/users', require('./users')(config, knexClient));
  router.use('/admin', tokenService.validateToken, require('./admin')(config, knexClient));

  return router;
};
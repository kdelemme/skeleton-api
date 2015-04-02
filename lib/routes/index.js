"use strict";
var express = require('express');
var directives = require('../directives');

module.exports = function(logger, config, knexClient) {
  var router = express.Router();
  var tokenService = directives.token(logger, knexClient);

  router.use('/users', require('./users')(logger, config, knexClient));
  router.use('/admin', tokenService.validateToken('access_token'), require('./admin')(logger, config, knexClient));

  return router;
};
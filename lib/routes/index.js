"use strict";
var express = require('express');

module.exports = function(config, knexClient) {
  var router = express.Router();

  router.use('/users', require('./users')(config, knexClient));

  return router;
};
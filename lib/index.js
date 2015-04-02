"use strict";
var express = require('express');

module.exports = function(logger, config) {
  var app = express();
  var knexClient = require('./databases')(config.database);

  app.use(require('./routes')(logger, config, knexClient));

  return app;
};
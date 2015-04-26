"use strict";
var express = require('express');
var morgan = require('morgan');

module.exports = function(logger, config) {
  var app = express();
  var knexClient = require('./databases')(config.database);

  app.use(morgan('combined'));
  app.use(require('./routes')(logger, config, knexClient));

  return app;
};
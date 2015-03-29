"use strict";
var express = require('express');

module.exports = function(config) {
  var app = express();
  var knexClient = require('./databases')(config.database);

  app.use(require('./routes')(config, knexClient));

  return app;
};
"use strict";
var express = require('express');

module.exports = function(config) {
  var app = express();
  var db = require('./databases')(config.database);

  app.use(require('./routes')(config, db));

  return app;
};
"use strict";
var express = require('express');
var app     = express();
var morgan = require('morgan');

var APP_ENV = process.env.APP_ENV || 'dev';
var config  = require('./config/config')[APP_ENV];

app.get('/status', function(req, res) {
  res.status(200).send('OK');
});

app.use(morgan('combined'));
app.use('/api', require('./lib')(config));

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Skeleton API listening at http://%s:%s', host, port);
});
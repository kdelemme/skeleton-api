"use strict";
var express = require('express');
var app     = express();
var morgan = require('morgan');
var bodyParser = require('body-parser')
var config  = require('./config/config');

app.get('/status', function(req, res) {
  res.status(200).send('OK');
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', require('./lib')(console, config));

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Skeleton API listening at http://%s:%s', host, port);
});
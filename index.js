'use strict';
const express = require('express');
const app     = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const config  = require('./config/config');

app.get('/status', function(req, res) {
	res.status(200).send('OK');
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('combined'));

const server = app.listen(config.port, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('API listening at http://%s:%s', host, port);
});
"use strict";
var express = require('express');
var errors = require('../errors');
var validation = require('../directives/validation');
var schemas = require('../schemas');

module.exports = function (logger, config, knexClient) {
  var router = express.Router();

  router.post('/login', validation.schema(schemas.users.login), function(req, res, next) {
    res.status(200).send('OK');
  });

  router.post('/register', validation.schema(schemas.users.register), function(req, res, next) {

    knexClient('users').insert({email: req.body.email, password: req.body.password});


    res.status(200).send('OK');
  });

  return router;
};
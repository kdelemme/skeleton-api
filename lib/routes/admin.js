"use strict";
var express = require('express');
var errors = require('../errors');
var directives = require('../directives');
var schemas = require('../schemas');

module.exports = function (config, knexClient) {
  var router = express.Router();

  router.get('/secure', function(req, res, next) {
    res.status(200).json({private: 'confidential data'});
  });

  return router;
};
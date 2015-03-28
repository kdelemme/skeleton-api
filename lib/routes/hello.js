"use strict";
var express = require('express');
var errors = require('../errors');

module.exports = function (logger, config, db) {
  var router = express.Router();

  router.get('', function(req, res, next) {
    res.status(200).send('Hello, World!');
  });

  return router;
};
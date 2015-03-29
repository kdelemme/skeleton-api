"use strict";
var express = require('express');
var errors = require('../errors');
var directives = require('../directives');
var schemas = require('../schemas');

module.exports = function (config, knexClient) {
  var router = express.Router();

  router.post('/login', directives.validation.schema(schemas.users.login), function(req, res, next) {
    res.status(200).send('OK');
  });

  router.post('/register', directives.validation.schema(schemas.users.register), function(req, res, next) {
    knexClient('users')
      .count('email')
      .where({ email: req.body.email }).exec(function(err, result) {
        if (err) {
          return next(new errors.InternalError());
        }

        if (result[0].count === '0') {
          directives.authorization.encryptPassword(req.body.password)
            .then(function(encryptedPassword) {

              knexClient('users').insert({email: req.body.email, password: encryptedPassword})
                .exec(function(err, result) {
                  return res.status(200).send();
                });
            });
        }
        else {
          return next(new errors.EntityAlreadyExistError('user'));
        }
      });
  });

  return router;
};
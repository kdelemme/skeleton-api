"use strict";
var express = require('express');
var errors = require('../errors');
var directives = require('../directives');
var schemas = require('../schemas');
var momentjs = require('moment');

module.exports = function (config, knexClient) {
  var router = express.Router();

  router.post('/login', directives.validation.schema(schemas.users.login), function(req, res, next) {
    knexClient.select('id', 'email', 'password').from('users').where({ email: req.body.email }).limit(1)
      .then(function(rows) {

        if (rows && rows.length > 0) {
          directives.password.comparePassword(req.body.password, rows[0].password)
            .then(function(match) {
              if (match) {
                return directives.token.generateToken();
              }
              else {
                return next(new errors.EntityNotFoundError('user'));
              }
            }).then(function(token) {
              knexClient('tokens').insert({user_id: rows[0].id, token: token/*, expiry: Date.now() + directives.token.defaultExpiry*/ })
                .then(function() {
                  return res.status(200).send({token: token});
                });
            });

        }
        else {
          return next(new errors.EntityNotFoundError('user'));
        }
      }, next);
  });

  router.post('/register', directives.validation.schema(schemas.users.register), function(req, res, next) {
    return knexClient('users').count('email').where({ email: req.body.email })
      .then(function(result) {
        if (result[0].count === '0') {
          return directives.password.encryptPassword(req.body.password)
            .then(function(encryptedPassword) {
              return knexClient('users').insert({email: req.body.email, password: encryptedPassword});
            }).then(function() {
              return res.status(200).send();
            });
        }
        else {
          return next(new errors.EntityAlreadyExistError('user'));
        }
      }, next);
  });

  return router;
};
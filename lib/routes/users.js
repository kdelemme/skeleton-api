"use strict";
var express = require('express');
var errors = require('../errors');
var directives = require('../directives');
var schemas = require('../schemas');
var momentjs = require('moment');

module.exports = function (config, knexClient) {
  var router = express.Router();
  var tokenService = directives.token(knexClient);

  router.post('/login', directives.validation.schema(schemas.users.login), function(req, res, next) {
    knexClient.select('id', 'email', 'password').from('users').where({ email: req.body.email }).limit(1)
      .then(function(rows) {
        if (rows && rows.length > 0) {
          return directives.password.comparePassword(req.body.password, rows[0].password)
            .then(function(match) {
              if (match) {
                return tokenService.generateToken();
              }
              else {
                return next(new errors.EntityNotFoundError('user'));
              }
            }).then(function(token) {
              return [token, knexClient('tokens').count('user_id').where({ user_id: rows[0].id }).limit(1)];
            }).spread(function(token, tokenRow) {
              if (tokenRow && tokenRow[0] && tokenRow[0].count === '0') {
                return [token, knexClient('tokens').insert({user_id: rows[0].id, token: token/*, expiry: Date.now() + tokenService.defaultExpiry*/ })];
              }
              else {
                return [token, knexClient('tokens').where({user_id: rows[0].id}).update({ token: token/*, expiry: Date.now() + tokenService.defaultExpiry*/ })];
              }
            }).spread(function(token, result) {
              return res.status(200).send({token: token});
            });
        }
        else {
          return next(new errors.EntityNotFoundError('user'));
        }
      }).catch(function(error) {
        console.error(error);
        return next(new errors.InternalError());
      });
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
      }).catch(function(error) {
        console.error(error);
        return next(new errors.InternalError());
      });
  });

  router.get('/secure', tokenService.validateToken, function(req, res, next) {
    res.status(200).json({private: 'confidential data'});
  });
  
  return router;
};
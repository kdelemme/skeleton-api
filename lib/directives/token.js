"use strict";
var R = require('ramda');
var errors = require('../errors');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var moment = require('moment');

module.exports = function(logger, knexClient) {
  return {
    generate: function generate() {
      return new Promise(function(resolve, reject) {
        resolve(uuid.v4());
      });
    },

    verify: function verify(tokenQueryParameter) {
      return function(req, res, next) {
        if (!req.query[tokenQueryParameter]) {
          return next(new errors.AuthenticationRequiredError());
        }

        return knexClient.select('tokens.expiry', 'users.id', 'users.email').from('tokens').where(function () {
          this.where('token', req.query[tokenQueryParameter])
            .whereRaw('expiry > ?', knexClient.raw('to_timestamp(?)', moment().format('X')));
        }).limit(1).leftJoin('users', 'users.id', 'tokens.user_id')
          .then(function (row) {
            if (row && row.length === 1) {
              req.user = { id: row[0].id, email: row[0].email};
              return next();
            }
            else {
              return next(new errors.AuthenticationRequiredError());
            }
          }).catch(function (error) {
            logger.error(error);
            return next(new errors.InternalError());
          });
      };
    },

    defaultExpiry: 60*60*24*2*1000 // 2 days in milliseconds
  };
};
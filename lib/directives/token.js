"use strict";
var R = require('ramda');
var errors = require('../errors');
var Promise = require('bluebird');
var uuid = require('node-uuid');
var moment = require('moment');

module.exports = function(knexClient) {
  return {
    generateToken: function generateToken() {
      return new Promise(function(resolve, reject) {
        resolve(uuid.v4());
      });
    },

    validateToken: function validateToken(req, res, next) {
      return knexClient.select('user_id', 'expiry').from('tokens').where(function() {
          this.where('token', req.query.access_token)
            .whereRaw('expiry > ?', knexClient.raw('to_timestamp(?)', moment().format('X')));
        }).limit(1)
        .then(function (row) {
          if (row && row.length === 1) {
            return next();
          }
          else {
            return next(new errors.AuthenticationRequiredError());
          }
        }).catch(function (error) {
          console.error(error);
          return next(new errors.InternalError());
        });
      },

      defaultExpiry: 60*60*24*2*1000 // 2 days in milliseconds
  };
};
"use strict";
var R = require('ramda');
var errors = require('../errors');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

module.exports = {
  encryptPassword: function encryptPassword(password) {
    return new Promise(function(resolve, reject) {
      return bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return reject(err);
        }

        return bcrypt.hash(password, salt, null, function(err, encryptedPassword) {
          if (err) {
            return reject(err);
          }

          return resolve(encryptedPassword);
        });
      });
    });
  },

  comparePassword: function comparePassword(password, encryptedPassword) {
    return new Promise(function(resolve, reject) {
      return bcrypt.compare(password, encryptedPassword, function(err, match) {
        if (err) {
          return reject(err);
        }

        return resolve(match);
      });
    });
  }
};
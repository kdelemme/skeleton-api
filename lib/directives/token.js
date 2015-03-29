"use strict";
var R = require('ramda');
var errors = require('../errors');
var Promise = require('bluebird');
var uuid = require('node-uuid');

module.exports = {
  generateToken: function generateToken() {
    return new Promise(function(resolve, reject) {
      resolve(uuid.v4());
    });
  },

  defaultExpiry: 60*60*24*2 // 2 days
};
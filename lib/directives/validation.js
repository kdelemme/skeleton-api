"use strict";
var R = require('ramda');
var errors = require('../errors');
var tv4 = require('tv4');
var formats = require('tv4-formats');
var validator = tv4.freshApi();
validator.addFormat(formats);

module.exports = {
  requireParameters: function requireParameters(parameters) {
    return function(req, res, next) {
      var missingParameters = R.filter(function(parameter) {
        return !req.query[parameter];
      }, parameters);

      if (missingParameters && missingParameters.length > 0) {
        return next(new errors.MissingParameterError(missingParameters));
      } else {
        return next();
      }
    };
  },

  schema: function schema(jsonSchema) {
    return function(req, res, next) {
      if (validator.validate(req.body, jsonSchema)) {
        return next();
      } else {
        return next(new errors.InvalidBodyError(validator.error.message));
      }
    };
  }
};
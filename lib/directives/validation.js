"use strict";
var R = require('ramda');
var errors = require('../errors');

module.exports = {
  requireParameters: function requireParameters(parameters) {
    return function(req, res, next) {
      var missingParameters = R.filter(function(parameter) {
        return !req.query[parameter];
      }, parameters);

      if (missingParameters && missingParameters.length > 0) {
        return next(new errors.MissingParameterError(missingParameters));
      } else {
        next();
      }
    };
  }
};
"use strict";
function InvalidBodyError(message) {
  this.status = 400;
  this.name = 'InvalidBodyError';
  this.message = message;
}
InvalidBodyError.prototype = Error.prototype;

module.exports = InvalidBodyError;
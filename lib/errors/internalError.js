"use strict";
function InternalError() {
  this.status = 500;
  this.name = 'InternalError';
  this.message = 'Something bad happened.';
}
InternalError.prototype = Error.prototype;

module.exports = InternalError;
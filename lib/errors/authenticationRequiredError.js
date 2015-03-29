"use strict";
function AuthenticationRequiredError() {
  this.status = 401;
  this.name = 'AuthenticationRequiredError';
  this.message = 'Invalid or missing token.';
}
AuthenticationRequiredError.prototype = Error.prototype;

module.exports = AuthenticationRequiredError;
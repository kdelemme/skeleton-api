"use strict";
function EntityNotFoundError(entity) {
  this.status = 404;
  this.name = 'EntityNotFoundError';
  this.message = entity + ' not found.';
}
EntityNotFoundError.prototype = Error.prototype;

module.exports = EntityNotFoundError;
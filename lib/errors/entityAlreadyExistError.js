"use strict";
function EntityAlreadyExistError(entity) {
  this.status = 400;
  this.name = 'EntityAlreadyExistError';
  this.message = entity + ' already exist';
}
EntityAlreadyExistError.prototype = Error.prototype;

module.exports = EntityAlreadyExistError;
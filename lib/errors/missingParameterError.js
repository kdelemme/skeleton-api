"use strict";
function MissingParameterError(parameters) {
  this.status = 400;
  this.name = 'MissingParameterError';
  this.message = 'The following parameter' + (parameters && parameters.length > 1 ? 's are' : ' is') + ' missing: '+ parameters.join(', ');
}
MissingParameterError.prototype = Error.prototype;

module.exports = MissingParameterError;
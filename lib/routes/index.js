var express = require('express');

module.exports = function(config, db) {
  var router = express.Router();

  router.use('/hello', require('./hello')(config, db));

  return router;
};
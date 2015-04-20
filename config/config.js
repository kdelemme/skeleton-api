'use strict';
module.exports = {
  dev: {
    port: 3030,
    database: {
      client: 'pg',
      connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'db_dev'
      }
    }
  },
  prod: {
    port: 4000,
    database: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db_prod'
      }
    }
  }
};
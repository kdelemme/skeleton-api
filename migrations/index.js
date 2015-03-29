"use strict";
var path = require('path');
var HOME = process.env.HOME || process.env.HOMEPATH;
var APP_ENV = process.env.APP_ENV || 'dev';
var config  = require('../config/config')[APP_ENV];

var knex = require('knex')(config.database);

knex.schema.hasTable('users')
  .then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.bigIncrements('id').primary();
        t.string('email', 100);
        t.string('password', 255);
        t.dateTime('created_at').defaultTo(knex.raw('now()'));
        t.dateTime('updated_at').defaultTo(knex.raw('now()'));
      });
    } else {
      console.log('users table already exists.');
    }
  }).then(function() {
    return knex.schema.hasTable('tokens').then(function (exists) {
      if (!exists) {
        return knex.schema.createTable('tokens', function (t) {
          t.bigIncrements('id').primary();
          t.biginteger('user_id').references('id').inTable('users');
          t.string('token', 255);
          t.timestamp('expiry');
          t.dateTime('created_at').defaultTo(knex.raw('now()'));
          t.dateTime('updated_at').defaultTo(knex.raw('now()'));
        });
      } else {
        console.log('tokens table already exists.');
      }
    });
  }).then(function() {
    process.exit(1);
  });
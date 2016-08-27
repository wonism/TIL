var config = require('../config/config');

var knex = require('knex')({
  client: config.rdb.client,
  connection: {
    host     : config.rdb.host,
    user     : config.rdb.user,
    password : config.rdb.password,
    database : config.rdb.database,
    charset  : config.rdb.charset
  }
});

var Bookshelf = require('bookshelf')(knex);

var models = require('./models');

var collections = {

};

module.exports = collections;


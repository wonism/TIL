var config = require('../config/config.json');

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

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

var models = {
  User: User
};

module.exports = models;


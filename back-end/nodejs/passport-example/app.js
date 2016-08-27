var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config.json');

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

var session = require('express-session');
var passport = require('passport');

var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient();

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

app.use(session({
  store: new RedisStore({ host: config.redis.host, port: config.redis.port, client: client }),
  key: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

# Passport 를 이용한 로그인 시스템 구축
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

__passport 란?__
- passport 는 OAuth 인증을 간편하게 해주는 Node JS 미들웨어로, Facebook 으로 로그인 하기, Twitter 로 로그인 하기 등을 쉽게 구현할 수 있다.
  - facebook 에서는 facebook strategy 를 사용하며, twitter 에서는 twitter strategy 를 사용한다.

## 개발 환경
__운영체제__
- OS X 10.11

__Back-end Framework__
- Express JS
  - View engine : ejs

__DB__
- MySQL

__ORM__
- bookshelf

__In-memory Dictionary__
- Redis

__Encryption__
- bcrypt

## 필요 모듈 설치
```sh
# passport 관련 모듈
$ npm install --save passport passport-local passport-facebook passport-twitter passport-google-oauth passport-kakao passport-naver

# DB 관련 모듈
$ npm install --save mysql lodash when knex bookshelf

# 암호화 모듈
$ npm install --save bcrypt

# 세션 관련 모듈
$ npm install --save express-session

# Redis 관련 모듈
$ npm install --save redis connect-redis
```

## 구현하기
### DB 세팅
- 먼저 회원 정보를 저장하기 위한 Data Base 환경을 구축한다.
  - DB 클라이언트는 MySQL 을 사용하며, 이미 설치가 되어 있다고 가정한다.
  - ORM 은 Bookshelf.js 를 사용한다. (Bookshelf.js 는 Query Builder 인 Knex.js 를 기반으로 만들어졌다.)

__config 파일 생성__
```sh
$ mkdir config && touch config/config.json
```

__config/config.json 작성__
```js
{
  "rdb": {
    "client": "mysql",
    "host": "127.0.0.1",
    "port": "3306",
    "user": "root",
    "password": "root",
    "database": "passport_test",
    "charset": "utf8"
  }
}
```

__db 생성 관련 파일 작성__
```sh
$ mkdir db && touch db/models.js db/migrate.js db/schema.js
```

__db/models.js 작성__
```js
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
```

__db/schema.js 작성__
```js
var Schema = {
  users: {
    id: { type: 'increments', nullable: false, primary: true },
    user_id: { type: 'string', maxlength: 150, nullable: false, unique: true },
    email: { type: 'string', maxlength: 254, nullable: false, unique: true },
    name: { type: 'string', maxlength: 150, nullable: false },
    password: { type: 'string', nullable: false },
    salt: { type: 'string', nullable: false },
    created_at: { type: 'dateTime', nullable: false },
    updated_at: { type: 'dateTime', nullable: false },
    level: { type: 'integer', nullable: false, defaultTo: 99 },
    from: { type: 'string', maxlength: '50', nullable: true, defaultTo: 'organic' },
    image: { type: 'string', nullable: true },
    is_locked: { type: 'boolean', nullable: false, defaultTo: 0 },
    is_deleted: { type: 'boolean', nullable: false, defaultTo: 0 }
  }
};

module.exports = Schema;
```

__db/migrate.js 작성__
```js
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

var Schema = require('./schema');
var sequence = require('when/sequence');
var _ = require('lodash');

function createTable(tableName) {
  return knex.schema.createTableIfNotExists(tableName, function (table) {
    var column;
    var columnKeys = _.keys(Schema[tableName]);
    _.each(columnKeys, function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      } else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      } else {
        column = table[Schema[tableName][key].type](key);
      }

      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }

      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }

      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }

      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }

      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }

      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}

function createTables () {
  var tables = [];
  var tableNames = _.keys(Schema);
  tables = _.map(tableNames, function (tableName) {
    return function () {
      return createTable(tableName);
    };
  });

  return sequence(tables);
}

createTables()
.then(function() {
  console.log('Tables created!!');
  process.exit(0);
})
.catch(function (error) {
  throw error;
});
```

__DB 생성__
```sh
$ node db/migrate.js
# 테이블이 생성되면, 'Tables created!!' 가 출력된다.
```

### 라우팅
__app.js 작성__
```js
/* ... */
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

/* ... */
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

/* ... */
```

### Redis 사용
__config/config.json 작성__
```js
{
  "rdb": {
    /* ... */
  },
  "redis": {
    "host": "127.0.0.1",
    "port": "6379"
  },
  "session": {
    "key": "passport_session",
    "secret": "s3cret!"
  }
}
```

__app.js 작성__
```js
/* ... */
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();

/* ... */
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

/* ... */
```

### Passport initialize 및 passport 내에서 session 사용
__app.js 작성__
```js
/* ... */
var session = require('express-session');
var passport = require('passport');

/* ... */
app.use(passport.initialize());
app.use(passport.session());

/* ... */
```
- 이 때, 주의할 것은, app.use(passport.initialize()); 와 app.use(passport.session()); 을 favicon 설정이나 assets(css, js etc..)  설정 이후에 작성해야 한다는 것이다.
  - 다음과 같은 상황을 예로 들 수 있다.
```js
app.use(passport.initialize());
app.use(passport.session());

app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'PUBLICPATH'));
/*
 * 이렇게 되면,
 * favicon 이나 public 내의 불려지는 파일들을 request 하는 만큼,
 * deserializeUser() 함수를 호출하게 되면서, 자원을 낭비하게 된다.
 */
```

### Passport 사용을 위한 config 파일 작성
__config/config.json 작성__
```js
{
  "rdb": {
    /* ... */
  },
  "redis": {
    /* ... */
  },
  "session": {
    /* ... */
  },
  "oauth": {
    "facebook": {
      "id": "ID",
      "secret": "SECRET",
      "callbackurl": "/login/oauth/facebook/callback"
    },
    "twitter": {
      "consumerkey": "CONSUMER_KEY",
      "consumersecret": "CONSUMER_SECRET",
      "callbackurl": "/login/oauth/twitter/callback"
    },
    "google": {
      "clientid": "CLIENT_ID",
      "clientsecret": "CLIENT_SECRET",
      "callbackurl": "/login/oauth/google/callback"
    },
    "kakao": {
      "restapikey": "REST_API_KEY",
      "callbackurl": "/login/oauth/kakao/callback"
    },
    "naver": {
      "clientid": "CLIENT_ID",
      "clientsecret": "CLIENT_SECRET",
      "callbackurl": "/login/oauth/naver/callback"
    }
  }
}
```

### E-mail 을 통한 회원가입 기능 구현
__흐름 설명__
- 'http://localhost:3000/login' 에 접근하면, 회원가입 폼 & 로그인 폼 & SNS 로그인 링크 들이 나온다.
- 회원가입 폼을 전송하면 /login/join 에 user_id 와 password 를 POST 방식으로 전송한다.
- /login/join 에서는 입력받은 ID 와 비밀번호를 DB 에 저장한다.
  - 1. 앞서 생성한 user 테이블에서 입력받은 ID 를 기준으로 row 를 찾는다.
  - 2. user 가 반환되면, 클라이언트에 Aleary Joined 라는 메시지를 보낸다.
  - 3. user 가 없으면, bcrypt 방식 암호화를 거쳐, ID, 비밀번호, salt 등을 저장한다.
- Bookshelf.js 의 자세한 사용방법은 [Bookshelf.js](http://bookshelfjs.org/) 에서 볼 수 있다.

__routes/login.js 작성__
```js
var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var config = require('../config/config.json');

var bcrypt = require('bcrypt');

var models = require('../db/models');

router.get('/', function (req, res, next) {
  res.send('<h1>회원가입</h1><form action="/login/join" method="POST" enctype="multipart/form-data"><input name="user_id" /><input name="password" /><input type="submit" /></form>' +
      '<br /><br /><br /><br /><br />' +
      '<h1>로그인</h1><form action="/login" method="POST"><input name="user_id" /><input name="password" /><input type="submit" /></form>' +
      '<br /><br /><br /><br /><br />' +
      '<a href="/login/oauth/facebook">페이스북 로그인</a><br />' +
      '<a href="/login/oauth/twitter">트위터 로그인</a><br />' +
      '<a href="/login/oauth/google">구글플러스 로그인</a><br />' +
      '<a href="/login/oauth/kakao">카카오톡 로그인</a><br />' +
      '<a href="/login/oauth/naver">네이버 로그인</a><br />');
});

router.post('/join', function (req, res, next) {
  var form = new formidable.IncomingForm();
  var fields = [];

  form.parse(req, function (err, fields, files) {
    models.User.forge()
    .query(function (qb) {
      qb
      .where('user_id', fields.user_id);
    })
    .fetch()
    .then(function (user) {
      if (user) {
        res.send('Already Joined');
      } else {
        bcrypt.genSalt(8, function (err, salt) {
          bcrypt.hash(fields.password, salt, function (err, hash) {
            fields.password = hash;
            models.User.forge({ user_id: fields.user_id, password: fields.password, salt: salt })
            .save()
            .then(function (user) {
              return res.redirect('/login');
            })
            .catch(function (err) {
              return res.render('500', { title: '500: Internal Server Error.'});
            });
          });
        });
      }
    })
    .catch(function (err) {
      return res.render('500', { title: '500: Internal Server Error.'});
    });
  });
});

module.exports = router;
```

### passport-local
__passport-local__
- ID 와 비밀번호를 받아 자체 인증 처리를 한다.
- LocalStrategy 는 기본적으로 username 이라는 필드와 password 라는 필드로 로그인 id 와 비밀번호를 받는다.
  - 이 예제에서는 user_id 와 password 필드를 사용한다.

__코드 설명__
- passport-local 모듈의 Strategy 를 LocalStrategy 에 대입한다.
- passport.authenticate 의 successRedirect 와 failureRedirect 는 말 그대로, 로그인 성공 / 실패 시 이동할 URL 이다.
- passport.use(new LocalStrategy()) 로 필요한 값들을 설정한다.
  - 첫 번째 인자에서 usernameField 에 user_id, passwordField 에는 password 를 사용한다.
  - 두 번째 인자에는 인증 함수가 사용된다.
    - 인자로는 ID, 비밀번호, 콜백함수 가 사용된다.
    - 이 함수에서 실제 인증 과정이 수행된다.
    - 로그인 로직에서 인증 성공 시, done(null, user); 를 수행하도록 한다.
    - 인증에 실패하면, done(null, false); 를 수행하도록 한다 .
    - done 에 3 번째 인자를 넘겨, message 를 전달할 수도 있다.
- 로그인에 성공하면, passport.serializeUser()를 통해 사용자 정보를 세션에 저장할 수 있다.
  - serializeUser 는 함수를 전달받으며 이 함수는 유저 정보와 콜백함수를 전달받는다.
  - serializeUser 가 전달받은 함수 내에서 done(null, user); 를 실행한다.
    - 이 때, user 로 넘어오는 정보는 LocalStrategy 내의 인증 함수에서 done(null, user); 에 의해 반환된 값이다.
- 로그인 성공 이후, 클라이언트가 페이지에 접근하게 되면, deserializeUser() 가 수행된다.
  - deserializeUser 에서는 session 에 저장된 값을 이용해서 사용자 정보를 가져오는 역할을 하며, HTTP Request 에 넘겨준다.
    - req.user 로 사용자 정보를 읽을 수 있다.
  - deserializeUser 내 콜백 함수의 첫 번째 인자로 넘어오는 user 는 세션에 저장된 사용자 정보이다.
  - user 의 user_id 를 통해 user 테이블에서 row 를 찾은 뒤, 반환된 row 값을 JSON 객체로 만들어 콜백함수의 2 번째 인자로 넘긴다.
- serializeUser 와 deserializeuser 의 수행 이유는
  - serializeUser 를 통해 세션에 저장되는 정보의 크기는 작게 하고,
  - deserializeUser 를 통해 데이터베이스에서 사용자 정보를 가져오기 위해서이다.

__인증 함수 흐름 설명__
- 인증 함수 내에서 입력받은 ID 가 존재하는 ID 이면, 비밀번호가 맞는지 확인한다.
  - 비밀번호가 일치하면 인증 성공 처리, 비밀번호가 일치하지 않으면 인증 실패 처리를 한다.
- 입력받은 ID 가 존재하지 않는 ID 이면, 인증 실패 처리를 한다.

__기타 정보(?)__
- LocalStrategy 로 가입 & 로그인 하는 과정에서 Access Token 을 부여하려면 JWT(Json Web Token) 를 사용하면 된다.

__routes/login.js 작성__
```js
/* ... */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* ... */
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

passport.use(new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'password'
  },
  function (user_id, password, done) {
    models.User.forge({ user_id: user_id })
    .fetch()
    .then(function (user) {
      if (user) {
        bcrypt.compare(password, user.toJSON().password, function (err, success) {
          if (success) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'ID 혹은 비밀번호가 잘못되었습니다.' });
          }
        });
      } else {
        return done(null, false, { message: 'ID 혹은 비밀번호가 잘못되었습니다.' });
      }
    })
    .catch(function (err) {
      return done(err, null);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  models.User.forge({ user_id: user.user_id })
  .fetch()
  .then(function (user) {
    done(null, user.toJSON());
  })
  .catch(function (err) {
    done(err);
  });
});

/* ... */
```

### passport-facebook
__사전 작업__
- Facebook 의 API 를 호출하기 위해서는 애플리케이션을 facebook 에 등록해야 한다.
- 등록 및 관리는 [https://developers.facebook.com/apps](https://developers.facebook.com/apps) 에서 할 수 있다.

__코드 설명__
- passport-facebook 모듈의 Strategy 를 FacebookStrategy 에 대입한다.
- 라우팅에서 passport.authenticate 할 때, scope 설정값을 넣어 정보를 가져올 수 있다.
  - public_profile (기본 권한) 에는 성별이나 나이, 이름 등을 가져올 수 있다.
  - email 을 가져오려면, scope 에 email 을 추가하여야 한다.
  - 가져올 수 있는 유저 정보에 대한 명세는 [https://developers.facebook.com/docs/graph-api/reference/v2.5/user](https://developers.facebook.com/docs/graph-api/reference/v2.5/user) 에서 볼 수 있다.
- passport.use(new FacebookStrategy()) 로 필요한 값들을 설정한다.
  - 첫 번째 인자에서 페이스북에서 발급받은 id 와 secret 값을 clientID 와 clientSecret 에 넣는다.
    - profileFields 를 통해 받고자 하는 값들을 정의할 수 있다. (배열로 넘겨줘야 한다.)
    - callbackURL 은 페이스북 로그인에 성공한 뒤에 오게될 URL 이다.
  - 두 번째 인자에는 인증 함수가 사용된다.
    - accessToken 은 OAuth 용 accessToken 으로 이 토큰을 이용해 페이스북의 Open API 를 사용할 수 있다. 만약 개발하려는 기능 중 페이스북의 API 를 호출해야되는 기능이 있다면, accessToken 도 세션에 저장해야 한다.
    - refreshToken 은 OAuth 용 refreshToken 으로 accessToken 이 만료되었을 때, 재발급을 요청하기 위해 사용한다.
    - profile 은 사용자의 페이스북 계정 정보가 담겨 있는 JSON 객체이다.

__id + @facebook__
- facebook 에서 가입했다는 것을 표시하기 위해 (?) id 에 페이스북 ID 값과 @facebook 을 concat 하여 user 테이블의 user_id column 에 저장한다.

__password = hash;__
- password 를 임의로 생성하기 위해, bcrypt 암호화 시 생성하는 salt 값을 password 로 하고, 이를 salt 로 다시 암호화한다.
- 잘못된 방법이라고 생각하지만.. 별 다른 방법이 없어서 이런 방법으로 사용하고 있다..

__기타 정보(?)__
- facebook 과 google, github 인증만이 사용자 e-mail 을 받아올 수 있다.
- twitter 나 kakao, naver 인증으로는 사용자 e-mail 을 받아올 수 없다.

__routes/login.js 작성__
```js
/* ... */
var FacebookStrategy = require('passport-facebook').Strategy;

/* ... */
router.get('/oauth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/oauth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* ... */
passport.use(new FacebookStrategy({
    clientID: config.oauth.facebook.id,
    clientSecret: config.oauth.facebook.secret,
    callbackURL: config.oauth.facebook.callbackurl,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      models.User.forge({ id: profile._json.id + '@facebook' })
      .fetch()
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          var user_id = profile._json.id + '@facebook';
          bcrypt.genSalt(8, function (err, salt) {
            var password = salt;
            bcrypt.hash(password, salt, function (err, hash) {
              password = hash;
              models.User.forge({ user_id: user_id, password: password, salt: salt, from: 'facebook' })
              .save()
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err, null);
              });
            });
          });
        }
      })
      .catch(function (err) {
        return done(err, null);
      });
    });
  }
));
```

### passport-twitter
__사전 작업__
- Twitter 의 API 를 호출하기 위해서는 애플리케이션을 Twitter 에 등록해야 한다.
- 등록 및 관리는 [https://apps.twitter.com](https://apps.twitter.com) 에서 할 수 있다.
- 웹 애플리케이션의 주소로 localhost 는 입력할 수 없고, 127.0.0.1 로 입력하여 개발환경에서도 이용할 수 있다.
  - naver 도 마찬가지이다.

__routes/login.js 작성__
```js
/* ... */
var TwitterStrategy = require('passport-twitter').Strategy;

/* ... */
router.get('/oauth/twitter', passport.authenticate('twitter'));

router.get('/oauth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* ... */
passport.use(new TwitterStrategy({
    consumerKey: config.oauth.twitter.consumerkey,
    consumerSecret: config.oauth.twitter.consumersecret,
    callbackURL: config.oauth.twitter.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      models.User.forge({ id: profile._json.id_str + '@twitter' })
      .fetch()
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          var user_id = profile._json.id_str + '@twitter';
          bcrypt.genSalt(8, function (err, salt) {
            var password = salt;
            bcrypt.hash(password, salt, function (err, hash) {
              password = hash;
              models.User.forge({ user_id: user_id, password: password, salt: salt, from: 'twitter' })
              .save()
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err, null);
              });
            });
          });
        }
      })
      .catch(function (err) {
        return done(err, null);
      });
    });
  }
));
```

### passport-google-oauth
__사전 작업__
- Google 의 API 를 호출하기 위해서는 애플리케이션을 Google 에 등록해야 한다.
- 등록 및 관리는 [https://console.developers.google.com/iam-admin/projects](https://console.developers.google.com/iam-admin/projects) 에서 할 수 있다.

__코드 설명__
- 앞서 나온 facebook 이나 twitter 에서 사용했던 것 처럼, require('passport-xxx').Strategy 를 사용하면 안된다.
  - require('passport-google-oauth').Strategy 와 require('passport-google-oauth').OAuth2Strategy 의 구조는 각각 아래와 같다.
```sh
{ [Function: Strategy]
  super_: 
   { [Function: OAuthStrategy]
     super_: { [Function: Strategy] Strategy: [Circular] },
     Strategy: [Circular],
     InternalOAuthError: [Function: InternalOAuthError] },
  Strategy: [Circular] }
```
```sh
[Function: Strategy]
  super_: 
   { [Function: OAuth2Strategy]
     super_: { [Function: Strategy] Strategy: [Circular] },
     Strategy: [Circular],
     AuthorizationError: [Function: AuthorizationError],
     TokenError: [Function: TokenError],
     InternalOAuthError: [Function: InternalOAuthError] },
  Strategy: [Circular] }
```
- scope 옵션으로 올 수 있는 값들은 [https://developers.google.com/+/web/api/rest/oauth#login-scopes](https://developers.google.com/+/web/api/rest/oauth#login-scopes) 에서 볼 수 있다.

__routes/login.js 작성__
```js
/* ... */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* ... */
router.get('/oauth/google', passport.authenticate('google', {
  scope: ['openid', 'email']
}));

router.get('/oauth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* ... */
passport.use(new GoogleStrategy({
    clientID: config.oauth.google.clientid,
    clientSecret: config.oauth.google.clientsecret,
    callbackURL: config.oauth.google.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      models.User.forge({ user_id: profile._json.id + '@googleplus' })
      .fetch()
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          var user_id = profile._json.id + '@googleplus';
          bcrypt.genSalt(8, function (err, salt) {
            var password = salt;
            bcrypt.hash(password, salt, function (err, hash) {
              password = hash;
              models.User.forge({ user_id: user_id, password: password, salt: salt, from: 'google' })
              .save()
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err, null);
              });
            });
          });
        }
      })
      .catch(function (err) {
        return done(err, null);
      });
    });
  }
));
```

### passport-kakao
__사전 작업__
- Kakao 의 API 를 호출하기 위해서는 애플리케이션을 Kakao 에 등록해야 한다.
- 등록 및 관리는 [https://developers.kakao.com/apps](https://developers.kakao.com/apps) 에서 할 수 있다.

__routes/login.js 작성__
```js
/* ... */
var KakaoStrategy = require('passport-kakao').Strategy;

/* ... */
router.get('/oauth/kakao', passport.authenticate('kakao'));

router.get('/oauth/kakao/callback', passport.authenticate('kakao', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* ... */
passport.use(new KakaoStrategy({
    clientID: config.oauth.kakao.restapikey,
    callbackURL: config.oauth.kakao.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      models.User.forge({ user_id: profile._json.id + '@kakao' })
      .fetch()
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          var user_id = profile._json.id + '@kakao';
          bcrypt.genSalt(8, function (err, salt) {
            var password = salt;
            bcrypt.hash(password, salt, function (err, hash) {
              password = hash;
              models.User.forge({ user_id: user_id, password: password, salt: salt, from: 'kakao' })
              .save()
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err, null);
              });
            });
          });
        }
      })
      .catch(function (err) {
        return done(err, null);
      });
    });
  }
));
```

### passport-naver
__사전 작업__
- Naver 의 API 를 호출하기 위해서는 애플리케이션을 Naver 에 등록해야 한다.
- 등록 및 관리는 [https://developers.naver.com/register](https://developers.naver.com/register) 에서 할 수 있다.

__routes/login.js 작성__
```js
/* ... */
var NaverStrategy = require('passport-naver').Strategy;

/* ... */
router.get('/oauth/naver', passport.authenticate('naver'));

router.get('/oauth/naver/callback', passport.authenticate('naver', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* ... */
passport.use(new NaverStrategy({
    clientID: config.oauth.naver.clientid,
    clientSecret: config.oauth.naver.clientsecret,
    callbackURL: config.oauth.naver.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      models.User.forge({ user_id: profile._json.id + '@naver' })
      .fetch()
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          var user_id = profile._json.id + '@naver';
          bcrypt.genSalt(8, function (err, salt) {
            var password = salt;
            bcrypt.hash(password, salt, function (err, hash) {
              password = hash;
              models.User.forge({ user_id: user_id, password: password, salt: salt, from: 'naver' })
              .save()
              .then(function (user) {
                return done(null, user);
              })
              .catch(function (err) {
                return done(err, null);
              });
            });
          });
        }
      })
      .catch(function (err) {
        return done(err, null);
      });
    });
  }
));
```


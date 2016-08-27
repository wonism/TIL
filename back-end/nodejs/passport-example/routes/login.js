var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var config = require('../config/config.json');

var bcrypt = require('bcrypt');

var models = require('../db/models');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var KakaoStrategy = require('passport-kakao').Strategy;
var NaverStrategy = require('passport-naver').Strategy;

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

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/oauth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/oauth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/oauth/twitter', passport.authenticate('twitter'));

router.get('/oauth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/oauth/google', passport.authenticate('google', {
  scope: ['openid', 'email']
}));

router.get('/oauth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/oauth/kakao', passport.authenticate('kakao'));

router.get('/oauth/kakao/callback', passport.authenticate('kakao', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/oauth/naver', passport.authenticate('naver'));

router.get('/oauth/naver/callback', passport.authenticate('naver', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

passport.use(new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'password'
  },
  function (user_id, password, done) {
    models.User.forge({ user_id: user_id, from: 'organic' })
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

passport.use(new FacebookStrategy({
    clientID: config.oauth.facebook.id,
    clientSecret: config.oauth.facebook.secret,
    callbackURL: config.oauth.facebook.callbackurl,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json);
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

passport.use(new TwitterStrategy({
    consumerKey: config.oauth.twitter.consumerkey,
    consumerSecret: config.oauth.twitter.consumersecret,
    callbackURL: config.oauth.twitter.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json);
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

passport.use(new GoogleStrategy({
    clientID: config.oauth.google.clientid,
    clientSecret: config.oauth.google.clientsecret,
    callbackURL: config.oauth.google.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json);
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

passport.use(new KakaoStrategy({
    clientID: config.oauth.kakao.restapikey,
    callbackURL: config.oauth.kakao.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json);
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

passport.use(new NaverStrategy({
    clientID: config.oauth.naver.clientid,
    clientSecret: config.oauth.naver.clientsecret,
    callbackURL: config.oauth.naver.callbackurl
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json);
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

module.exports = router;


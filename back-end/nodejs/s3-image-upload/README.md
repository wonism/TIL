# AWS S3 에 이미지 업로드하기
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

## 개발환경
- OS X
- Express JS

## NPM 모듈 설치
```sh
$ npm install aws-sdk fs multer async
```

## Helper 작성 (helper/S3Manager.js)
```js
var AWS = require('aws-sdk');
var config = require('../config/config.json');

// AWS.S3 객체를 만들기 전에 반드시 AWS 의 configuration 이 먼저 세팅되어야 한다.
AWS.config.region = config.aws.region;
AWS.config.update({
  accessKeyId: config.aws.key,
  secretAccessKey: config.aws.secret
});

var S3 = new AWS.S3({ params: { Bucket: config.aws.s3.bucket } });

function upload(key, body, cb) {
  var params = {
    Bucket: config.aws.s3.bucket,
    Key: key,
    Body: body,
    ACL: 'public-read',
    ContentType: 'image/*'
  };

  S3.upload(params, function (err, data) {
    cb(err, data);
  });
}

exports.upload = upload;
```

## app.js 작성
```js
/* ... */
// Modules
var fs = require('fs');
var multer = require('multer');

/* ... */
// Helper
var S3Manager = require('./helper/S3Manager');

/* ... */
// Other Variables
var S3_BUCKET = config.aws.s3.baseUrl + config.aws.s3.bucket;
var S3_ENDPOINT = S3_BUCKET + '/PATH/TO/S3/IMAGE';
var UPLOAD_DIR = __dirname + '/PATH/TO/IMAGE/';

/* ... */
// Routes
app.post('/upload', function (req, res, next) {
  var file, name, path, type, extension;

  file = req.file;
  name = file.name;
  path = file.path;
  type = file.type;
  extension = name.match(/\.\w{1,}$/)[1];

  if (type.indexOf('image') === -1) {
    var outputPath = UPLOAD_DIR + 'FILENAME' + extension;

    fs.rename(path, outputPath, function (err) {
      if (err) {
        return res.status(500).send({ result: false, error: 'failed to upload' });
      } else {
        async([
          function (cb) {
            S3Manager.upload('S3/IMAGE/PATH/' + 'FILENAME' + extension, fs.createReadStream(outputPath), function (err, data) {
              if (err) {
                return res.status(500).send('failed to upload S3');
              } else {
                cb(null, data);
              }
            });
          }, function (data, cb) {
            return res.send({ result: true, S3Url: data.key });
          }
        ], function (err) {
          return res.status(500).send({ result: false, error: 'failed to upload' });
        });
      }
    });
  } else {
    fs.unlink(path, function (err) {
      return res.status(500).send(err);
    });
  }
});
```


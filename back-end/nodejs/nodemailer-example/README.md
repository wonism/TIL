# Nodemailer 를 이용한 이메일 보내기
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

__nodemailer 란?__
- Node JS 에서 e-mail 을 쉽게 보낼 수 있게 도와주는 모듈
- G-mail, Naver, Yahoo 등 의 서비스도 지원한다.
  - [링크](https://github.com/nodemailer/nodemailer-wellknown#supported-services) 에서 확인할 수 있다.
- nodemailer 0.7 버전과 1.x 버전 이상의 사용방법은 다르다.
  - 이 예제에서는 2.5 버전을 사용한다.

## 개발환경
- OS X 10.11
- Express JS

## 모듈 설치
```sh
$ npm install --save nodemailer nodemailer-smtp-pool
```

## 구현하기
__config 파일 (config/config.json) 작성__
```json
{
  "mailer": {
    "service": "Gmail",
    "host": "localhost",
    "port": "465",
    "user": "USER_ID@gmail.com",
    "password": "PA55W0RD"
  }
}
```

__./mailer.js 작성__
__코드 설명__
- smtpPool 는 smtp 서버를 사용하기 위한 모듈이다.
  - nodemailer 의 createTransport 는 transporter 객체를 만드는 메소드인데, 이 메소드의 인자로 쓰인다.
- sender : 보내는 사람 메일 주소
- receiver : 받는 사람 메일 주소
- mailTitle : 메일 제목
- html : 메일 본문의 HTML 코드
  - html 대신 text 를 사용할 수도 있으며, 텍스트만 올 수 있다.
- sendMail 메소드를 통해 메일을 실제로 발송할 수 있으며,
  - 첫 번째 인자는 mailOptions,
  - 두 번째 인자는 에러와 결과를 인자로 받는 콜백 함수이다.

```js
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var config = require('./config/config.json');

var sender = '보내는 사람 < SENDER@gmail.com >';
var receiver = 'RECEIVER@gmail.com';
var mailTitle = '메일 제목';
var html = '<h1>HTML TEST</h1>';

var mailOptions = {
  from: sender,
  to: receiver,
  subject: mailTitle,
  html: html
};

var transporter = nodemailer.createTransport(smtpPool({
  service: config.mailer.service,
  host: config.mailer.host,
  port: config.mailer.port,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password
  },
  tls: {
    rejectUnauthorize: false
  },
  maxConnections: 5,
  maxMessages: 10
}));

transporter.sendMail(mailOptions, function (err, res) {
  if (err) {
    console.log('failed... => ' + err);
  } else {
    console.log('succeed... => ' + res);
  }
  transporter.close();
});
```

__메일 전송하기__
- 커맨드라인에서 다음 명령어를 입력하면, 메일을 전송한다.
```sh
$ node mailer
```

__메일이 전송되지 않는 경우__
```sh
failed... => Error: Invalid login: 534-5.7.14 <https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbsJ
534-5.7.14 ...
534-5.7.14 ...
534-5.7.14 ...
534-5.7.14 ... Please log in via your web browser and
534-5.7.14 then try again.
534-5.7.14  Learn more at
534 5.7.14  https://support.google.com/mail/answer/78754
9sm2025812pfo.74 - gsmtp
```
- 위와 같은 메시지가 출력될 경우,
  - https://myaccount.google.com/security?pli=1 에서 보안 수준이 낮은 앱 허용을 사용 안함에서 사용으로 바꾸면 된다.
  - 사용으로 바꾸면, succeed... => [object Object] 라는 메시지가 콘솔에 출력된다.


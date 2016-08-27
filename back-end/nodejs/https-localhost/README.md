# localhost 에서 HTTPS 환경 구축하기
- 최신 버전의 Chrome 에서는 HTTPS 가 아닌 HTTP 환경에서 geolocation API 나 getUserMedia 등을 사용할 수 없다.
  - 즉, 일반적인 localhost 에서도 위 API 들을 사용할 수 없다는 것이다.
- 하지만, Open SSL 을 이용해 자체 인증서를 만들어서, 개발용으로 https 서버를 구축할 수 있다.

__개인키 발급__
- 먼저, 개인키를 발급한다.
```sh
$ openssl genrsa 1024 > key.pem
Generating RSA private key, 1024 bit long modulus
...........................++++++
..........................++++++
e is 65537 (0x10001)
```

__인증서 파일 생성__
- 개인키를 통해 인증서를 만든다.
```sh
$ openssl req -x509 -new -key key.pem > cert.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:*****
State or Province Name (full name) [Some-State]:*****
Locality Name (eg, city) []:*****
Organization Name (eg, company) [Internet Widgits Pty Ltd]:*****
Organizational Unit Name (eg, section) []:*****
Common Name (e.g. server FQDN or YOUR name) []:*****
Email Address []:*****
```
- 인증서를 만들기 위해 몇 가지 정보를 기입하면, 인증서 파일 cert.pem 이 만들어진다.

__Express 프로젝트 생성__
```sh
$ express https_test && cd https_test && npm install && npm install --save https fs
```
- Express 프로젝트를 생성한 뒤, bin/www 를 수정한다.
```js
/* ... */
var http = require('http');
var https = require('https');

var fs = require('fs');

var options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem')
};

var HTTP_PORT = 80;
var HTTPS_PORT = 443;

/* ... */
var port = normalizePort(HTTP_PORT);
app.set('port', port);

var httpsPort = normalizePort(HTTPS_PORT);
app.set('httpsPort', httpsPort);

/* ... */
var server = http.createServer(app);
var httpsServer = https.createServer(options, app);

/* ... */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

httpsServer.listen(httpsPort);
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/* ... */
```

__Node JS 서버 실행__
```sh
$ sudo npm start
```

__확인__
- 브라우저에서 https://localhost 로 접속을 한다.


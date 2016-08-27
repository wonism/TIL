# Let's Encrypt 로 HTTPS 사용하기
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

__HTTPS 란?__
- HTTPS(Hypertext Transfer Protocol over Secure Socket Layer) 는 HTTP 의 보안이 강화된 버전이다.
- 소켓 통신에서 일반 텍스트 대신, SSL 이나 TLS 프로토콜을 통해 데이터를 암호화한다.
- HTTPS 의 기본 TCP/IP 포트는 443 이다.

__Let's Encrypt__
- Let's Encrypt 는 SSL 인증서를 무료로 제공한다.

## 개발환경
- Linux Ubuntu 14.04
- Nginx
- Express JS

## Let's Encrypt 설치 및 pem 생성
- letsencrypt 를 깃허브 저장소에서 clone 하고, nginx 가 실행중이라면, nginx 를 종료한다.
```sh
# Cloning letsencrypt
$ cd ~
$ sudo git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt

# Stop nginx
$ service nginx stop
```
- 인증서를 생성한다.
  - ./letsencrypt-auto --help 명령으로 외존된 파일들을 다운받을 수도 있지만,
  - 아래와 같은 명령으로 이 과정을 생략할 수 있다.
```sh
$ ./letsencrypt-auto certonly --standalone --email USER@EMAIL.COM -d YOUR_SITE.COM -d WWW.YOUR_SITE.COM
```
- 인증서를 생성하는 과정에서 인증서를 발급받는 대상을 확인하는 과정을 거친다.
```sh
Make sure your web server displays the following content at
http://YOUR_SITE.com/.well-known/acme-challenge/RANDOM_KEY before continuing:

RANDOM_KEY.RANDOM_VALUE

If you don't have HTTP server configured, you can run the following
command on the target server (as root):

mkdir -p /tmp/letsencrypt/public_html/.well-known/acme-challenge
cd /tmp/letsencrypt/public_html
printf "%s" RANDOM_KEY.RANDOM_VALUE > .well-known/acme-challenge/RANDOM_KEY
# run only once per server:
$(command -v python2 || command -v python2.7 || command -v python2.6) -c \
"import BaseHTTPServer, SimpleHTTPServer; \
s = BaseHTTPServer.HTTPServer(('', 80),
SimpleHTTPServer.SimpleHTTPRequestHandler); \
s.serve_forever()"
Press ENTER to continue
```
- http://YOUR_SITE.COM/.well-known/acme-challenge/RANDOM_KEY 라는 주소로 웹 서버에 접속할 때, RANDOM_KEY.RANDOM_VALUE 라는 텍스트가 나오도록 수정한다.
- If you don't have HTTP server 이하의 문장(?) 들은 웹서버가 없을 경우, OS 에 내장된 파이썬을 사용하여 웹 서버를 띄울 수 있도록 한 것이다. 별도의 웹 서버가 없다면, 이 명령어들을 Copy & Paste 한다.

__Express JS 인 경우__
```js
/***** app.js *****/
app.get('/.well-known/acme-challenge/RANDOM_KEY', (req, res) => {
  res.type('text/plain');
  res.send('RANDOM_KEY.RANDOM_VALUE');
});
```

__Nginx 인 경우__
- /home/USER/www/well-known/.well-know/acme-challenge/RANDOME_KEY 파일 생성
```
RANDOME_KEY.RANDOME_VALUE
```
- /etc/nginx/site-available/default
```
server {
  listen 80;
  ...
  location /.well-known {
    root /home/USER/www/well-known;
  }
}
```

- 위와 같이 설정하고, http://YOUR_SITE.COM/.well-known/acme-challenge/RANDOM_KEY 에 접속할 경우, RANDOME_KEY.RANDOM_VALUE 가 출력되어야 한다.
- Press ENTER to continue 에서 Enter 키를 눌러 진행하면, 성공/실패 여부가 출력된다.
  - 성공할 경우, 인증서의 경로와 유효 기간이 출력된다.
    - 인증서의 경로는 /etc/letsencrypt/live/SITE/ 이다.
    - 인증서의 유효기간은 90 일로, 90 일이 지나면, 새로 갱신을 해야한다.

## Nginx 설정 및 실행
- nginx 설정을 한다.
```
server {
  listen 80;
  server_name SITE;
  rewrite ^(.*) https://SITE$1 permanent;
}

server {
  listen 443;
  ssl on;

  ssl_certificate /etc/letsencrypt/live/SITE/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/SITE/privkey.pem;
}
```
```sh
$ sudo service nginx start
```

## Crontab 으로 90 일 주기로 인증서 자동 갱신하기
- crontab -e 명령어를 실행하여, 설정을 편집한다.
```sh
$ crontab -e
```
```
#!/bin/sh
# This script renews all the Let's Encrypt certificates every month.
30 2 1 * * /opt/letsencrypt/letsencrypt-auto renew >> /var/log/le-renew.log
35 2 1 * * /etc/init.d/nginx reload
```
- 이로써, 매월 1 일 2 시 30 분에 letsencrypt 인증서를 갱신하고, 2 시 35 분에 nginx 를 재시작한다.


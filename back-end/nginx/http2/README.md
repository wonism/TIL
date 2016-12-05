# Use HTTP/2

## Environment
```
Ubuntu 14.04
Open SSL 1.0.2
Nginx 1.10.1 (Nginx 1.9.5 이상)
(+) SSL 은 적용되었다고 가정한다.
```

## Open SSL 1.0.2 설치
- 먼저, Open SSL 1.0.2 를 설치한다.
- 최신 버전의 크롬에서는 ALPN 만 지원하는데, ALPN 을 사용하지 않으면, 최신 버전 크롬 사용자의 브라우저는 HTTP/1 로 다운그레이드 된다. (즉, HTTP/2 를 사용할 수 없다.)
  - HTTP/2 는 HTTP1.0/1.1 과 호환을 위해 Protocol negotiation 을 통해 HTTP/2 사용 여부를 결정하는데, NPN (Next Protocol Negotiation) 대신 ALPN (Application) 을 사용한다.
  - Open SSL 은 `1.0.2` 버전부터 ALPN 를 지원하며, `1.0.1` 및 이전 버전은 ALPN 을 지원하지 않는다.

```sh
$ wget -c https://www.openssl.org/source/openssl-1.0.2h.tar.gz
$ tar xf openssl-1.0.2h.tar.gz -C /usr/local/
$ cd /usr/local/openssl-1.0.2h
$ ./config
$ make depend
$ make
$ make test
$ make install
$ mv /usr/bin/openssl /usr/bin/openssl_1.0.1e
$ ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl
$ openssl version
```

## Nginx 설치
- Ubuntu 14.04 에서 `apt-get` 을 통해 Nginx 를 설치 혹은 업데이트 하면, `1.4.6` 버전이 설치된다. 아래 링크는 Nginx stable 버전을 설치하기 위한 명령어를 정리한 것이니, 아래 링크를 참고하여 Nginx 를 설치한다.
  - [링크](https://github.com/wonism/TIL/tree/master/back-end/nginx/update-nginx)
- 그 뒤, nginx 가 설치된 경로에서 다음 명령어를 수행한다.
```sh
$ ./configure \
    --prefix=/usr/share/nginx \
    --sbin-path=/usr/sbin/nginx \
    --conf-path=/etc/nginx/nginx.conf \
    --pid-path=/var/run/nginx.pid \
    --lock-path=/var/lock/nginx.lock \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --user=www-data \
    --group=www-data \
    --without-mail_pop3_module \
    --without-mail_imap_module \
    --without-mail_smtp_module \
    --without-http_fastcgi_module \
    --without-http_uwsgi_module \
    --without-http_scgi_module \
    --without-http_memcached_module \
    --with-http_ssl_module \
    --with-openssl=/usr/local/openssl-1.0.2h \
    --with-http_stub_status_module \
    --with-http_gzip_static_module \
    --with-http_v2_module

# nginx 를 멈춘 뒤,
$ nginx -s stop

# make 로 컴파일 수행
$ make
$ make install

# 다시 nginx 실행
$ nginx

# nginx -V 를 통해 버전을 확인하면, 버전 및 Open SSL 정보를 볼 수 있다.
$ nginx -V
```
- 참고 (ALPN 및 NPM 에 대한 OS 별 지원현황)
| OS | System Open SSL | ALPN / NPN Support |
| :-- | :-- | :-- |
| CentOS/Oracle Linux/RHEL 5.10+ | 0.9.8e | Neither |
| CentOS/Oracle Linux/RHEL 6.5+, 7.0+ | 1.0.1e | NPN |
| Ubuntu 12.04 LTS | 1.0.1 | NPN |
| Ubuntu 14.04 LTS | 1.0.1f | NPN |
| Ubuntu 16.04 LTS | 1.0.2g | ALPN AND NPN |
| Debian 7.0 | 1.0.1e | NPN |
| Debian 8.0 | 1.0.1k | NPN |

### ALPN 사용 여부 확인
```sh
$ echo | openssl s_client -alpn h2 -connect yourserver.example.com:443 | grep ALPN

# ALPN 을 사용하는 경우,
ALPN protocol: h2

# ALPN 을 사용하지 않는 경우,
No ALPN negotiated
```

## Nginx 설정
- 설치 (혹은 업데이트)가 끝나면 포트 설정을 한다.
```sh
$ sudo vi /etc/nginx/sites-available/default
```

```
# /etc/nginx/sites-available/default
server {
        listen 80;
        server_name example.com;
        rewrite ^(.*) https://example.com$1 permanent;
}

server {
        listen 443 ssl http2 default_server;
        server_name example.com;
        # ...
}
```
- 위와 같이 `listen` 에 `http2` 를 추가해준다. 이 변수는 `Nginx` 에게 지원되는 브라우저에서 `HTTP/2` 를 사용하도록 지시한다.
  - * SPDY 와 HTTP/2 를 같이 사용할 수 없다.

## Nginx 재실행
- 설정을 마친 뒤, Nginx 를 재실행한다.
```sh
$ sudo service nginx restart
```

## HTTP/2 적용 확인
- [https://tools.keycdn.com/http2-test](https://tools.keycdn.com/http2-test) 에서 URL 을 입력하고, `TEST` 버튼을 누른다.
- HTTP/2 와 ALPN 지원 여부를 볼 수 있다.

## 참고
- [Nginx Blog](https://www.nginx.com/blog/supporting-http2-google-chrome-users/)
- [Digital Ocean : How to get already installed NGINX to use OpenSSL 1.0.2 for ALPN?](https://www.digitalocean.com/community/questions/how-to-get-already-installed-nginx-to-use-openssl-1-0-2-for-alpn)


# Use HTTP/2

## Environment
```
Ubuntu 14.04
Nginx 1.10.1 (Nginx 1.9.5 이상)
(+) SSL 은 적용되었다고 가정한다.
```

## Nginx 설치
- Ubuntu 14.04 에서 `apt-get` 을 통해 Nginx 를 설치 혹은 업데이트 하면, `1.4.6` 버전이 설치된다. 아래 링크는 Nginx stable 버전을 설치하기 위한 명령어를 정리한 것이니, 아래 링크를 참고하여 Nginx 를 설치한다.
- [링크](https://github.com/wonism/TIL/tree/master/back-end/nginx/update-nginx)

## Nginx 설정
- 설치 (혹은 업데이트)가 끝나면 포트 설정을 한다.
```sh
$ sudo vi /etc/nginx/sites-available/default
```

```
# /etc/nginx/sites-available/default
server {
        listen 80;
        listen [::]:80;
        server_name example.com;
        rewrite ^(.*) https://example.com$1 permanent;
}

server {
        listen 443 ssl http2 default_server;
        listen [::]:443 ssl http2 default_server;
        server_name example.com;
        # ...
}
```
- 위와 같이 `listen` 에 `http2` 를 추가해준다. 이 변수는 `Nginx` 에게 지원되는 브라우저에서 `HTTP/2` 를 사용하도록 지시한다.
- `listen` 이 두개가 있는 것을 볼 수 있는데, `listen PORT_NUMBER` 는 IPv4 연결용이고, `listen [::]:PORT_NUMBER` 는 IPv6 연결용이다.

## Nginx 재실행
- 설정을 마친 뒤, Nginx 를 재실행한다.
```sh
$ sudo service nginx restart
```

## HTTP/2 적용 확인
- [https://tools.keycdn.com/http2-test](https://tools.keycdn.com/http2-test) 에서 URL 을 입력하고, `TEST` 버튼을 누른다.


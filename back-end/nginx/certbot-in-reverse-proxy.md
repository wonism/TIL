# 리버스 프록시(Nginx)에서 Certbot 사용하기
```
# Certbot이 해당 포트를 수신할 수 있도록 nginx를 중지한다.
$ nginx -s stop

# Nginx를 리버스 프록시로 사용을 한다면, `webroot`가 아닌 `standalone`을 사용한다.
$ ./certbot-auto certonly standalone -d domain.com

# Nginx를 재실행한다.
$ nginx
```


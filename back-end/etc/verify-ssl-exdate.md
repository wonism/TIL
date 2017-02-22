# SSL 인증서 만료일 확인
- openssl 을 이용한 방법
```
$ echo '' | openssl s_client -connect DOMAIN:443 | openssl x509 -noout -dates
...
notBefore=Feb 22 17:16:00 2017 GMT
notAfter=May 23 17:16:00 2017 GMT
```

- Secure sign 홈페이지
  - https://www.securesign.kr/tools/online-check-ssl-installation 접속


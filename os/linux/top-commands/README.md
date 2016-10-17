# 터미널에서 가장 많이 사용한 명령어 보기
```sh
$ history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10
```


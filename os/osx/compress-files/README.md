# 파일 압축하기

## zip
- zip 파일 형태로 압축하기 위한 명령어이다.
- -r 옵션을 통해 디렉토리 를 압축할 수도 있다.
  - 다양한 옵션들이 있는데, 유용한 옵션은 -r (recurse into directories), -9 (compress better), -e (encrypt) 등이다.
  
__EX) 현재 경로에 있는 모든 파일 압축하기__
```sh
$ zip -r ZIP_NAME.zip ./*
```

## unzip
- zip 파일에 압축된 파일들을 추출한다.
- unzip ZIP_NAME.zip 으로 압축을 해제할 수 있다.
  - -l 옵션으로 zip 파일에 압축된 파일 리스트를 볼 수 있다.
```
$ unzip ZIP_NAME.zip
```

# 커맨드라인 복사 및 붙여넣기
## pbcopy
- pbcopy 는 커맨드 라인에서 파일의 텍스트나, 커맨드 실행 결과 등을 복사하고 싶을 때 사용하는 명령어이다.

__어떤 파일의 내용물을 클립보드로 복사할 때__
```sh
$ pbcopy < SOME_FILE
```
__어떤 명령의 결과를 클립보드로 복사할 때__
```sh
$ ls -alf | pbcopy
$ echo "Hello, World!" | pbcopy
```

## pbpaste
- pbpaste 는 커맨드 라인에서 클립보드에 저장된 내용을 붙여넣기하는 명령어이다.

__어떤 파일에 클립보드에 저장된 내용을 붙여넣을 때__
```sh
$ pbpaste >> foo
```


# Command Line Interface
### 바로 이전 명령어 실행하기
```
$ !!
```
__응용 예__
```
# previous command is
$ echo
$ !! $USER
# above command is same with echo $USER
wonism
```

### 히스토리의 가장 처음 명령어 실행하기
```
$ !1
```

### 히스토리의 가장 마지막 명령어 실행하기
```
$ !-1
```

### xxx로 시작하는 마지막 명령어 실행하기
```
# ssh로 시작하는 마지막 명령어 실행하기
$ !ssh

# ls로 시작하는 마지막 명령어 실행하기
$ !ls
```

### 마지막 커맨트의 첫번째 아규먼트
```
$ !:1
```

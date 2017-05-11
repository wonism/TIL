# Update Nginx in Ubuntu 14.04
```sh
$ sudo apt-get install python-software-properties
$ sudo add-apt-repository ppa:nginx/stable
$ sudo apt-get update
$ sudo apt-get upgrade

$ sudo apt-get upgrade nginx
```

`sudo apt-get upgrade nginx` 명령을 수행하면, 기존의 설정 파일들을 어떻게 할지 물어보는데, 상황에 맞는 명령어를 입력하면 된다. (default 는 'N')

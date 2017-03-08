# Git 커맨드 자동완성

```sh
$ cd ~/github
$ git clone git://git.kernel.org/pub/scm/git/git.git
$ mkdir -p /usr/local/etc/bash_completion.d
$ cp git/contrib/completion/git-completion.bash /usr/local/etc/bash_completion.d/
$ echo -e '# Git command completion\nsource /usr/local/etc/bash_completion.d/git-completion.bash' >> ~/.bash_profile
$ source ~/.bash_profile
```

터미널에서 `git ` 을 타이핑한 뒤, `tab` 키를 누르면, 사용할 수 있는 명령어들이 나온다.
또, `git l` 까지 타이핑한 뒤, `tab` 키를 누르면, `git log` 로 자동완성된다.


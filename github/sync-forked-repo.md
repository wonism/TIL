# Fork 된 Repository 를 Original Repository 와 동기화하기

__remote 설정하기__
```sh
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

__upstream 으로부터 변경된 파일 가져오기__
```sh
$ git fetch upstream
```

__master 브랜치로 이동__
```sh
$ git checkout master
```

__병합하기__
```sh
$ git merge upstream/master
```
<p>만약, conflict 가 발생했다면, 필요한 부분을 편집한다.</p>


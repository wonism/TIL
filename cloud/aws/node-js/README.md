# Elastic Beanstalk 에 Node JS 애플리케이션 <s>생성하기</s> 생성하는 과정에서 삽질하며 알게된 것들 (계속 추가 예정)

__node 와 npm 설치 경로__
- node 와 npm 은 각각 다음 경로`(/opt/elasticbeanstalk/node-install/node-v*/bin/)`에 설치되어 있다.
- ssh 로 접속하여, `node`, `npm` 명령어를 실행하면, 실행이 안된다. 
```sh
$ ls /opt/elasticbeanstalk/node-install/node-v*/bin/
node npm
```

__Node JS 애플리케이션 경로__
- Node JS 애플리케이션은 아 경로 (`/var/app/current/`) 에 있다.

__배포하는 과정에서 겪은 삽질 -1-__
- 노드 모듈에 gulp, gulp plugins, babel, babel plugins, webpack 등이 설치되어 있으면, `npm install` 과정에서 에러가 발생한다. (내 개발환경에서만 그런 것일 수도 있다..)


__아직 너무 적은데, 몇 가지 삽질을 더 해보면서 채워나갈 예정이다.__

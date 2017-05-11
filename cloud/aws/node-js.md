# Elastic Beanstalk 에 Node JS 애플리케이션 <s>생성하기</s> 생성하는 과정에서 삽질하며 알게된 것들 (계속 추가 예정)

### node 와 npm 설치 경로
- node 와 npm 은 각각 다음 경로`(/opt/elasticbeanstalk/node-install/node-v*/bin/)`에 설치되어 있다.
- ssh 로 접속하여, `node`, `npm` 명령어를 실행하면, 실행이 안된다. 
```sh
$ ls /opt/elasticbeanstalk/node-install/node-v*/bin/
node npm
```

### Node JS 애플리케이션 경로
- Node JS 애플리케이션은 아 경로 (`/var/app/current/`) 에 있다.

### 삽질 -1-
__삽질 내용__
- `zip -r PROJECTNAME.zip ./*` 로 압축을 해서, `node_modules` 까지 압축이 됐었는데,<br />`node_modules` 에 빌드툴과 번들러 등 devDepencencies 로 설치된 모듈들이 포함되어 있어서 에러가 난 것 같다.
 
__해결 방법__
- <s>노드 모듈에 gulp, gulp plugins, babel, babel plugins, webpack 등이 설치되어 있으면, `npm install` 과정에서 에러가 발생한다. (내 개발환경에서만 그런 것일 수도 있다..)</s>
- `node_modules` 디렉토리는 제외하고 압축한다.
- (gulp, gulp plugins, babel, babel plugins, webpack 등의 모듈은 devDependencies 로 설치한다. (ex. `npm install -D gulp`))

__알게 된 것__
- aws eb 에서는 `npm install --production` 로 의존성 모듈을 설치한다.

### 삽질 -2-
__삽질 내용__
- 암호화를 하기 위해, `bcrypt` 모듈이 필요한 상황이었다. ELB 에 모듈을 설치하기 위해, `package.json`의 `dependencies`에 `bcrypt`를 추가하였다. 하지만, ELB 디플로이 과정에서 모듈 설치 시, 자꾸 에러가 발생했다.

__해결 방법__
- gcc 를 설치하였다. (참고 : [SO](http://stackoverflow.com/questions/29103839/impossible-to-install-bcrypt-with-npm-on-ec2))
```sh
$ yum install gcc44 gcc44-c++
$ export CC="gcc44"
$ export CXX="g++44"
$ npm install -g level
```

### 업데이트할 내용
- elb 에서 `pm2` 사용하기

__아직 너무 적은데, 몇 가지 삽질을 더 해보면서 채워나갈 예정이다..__

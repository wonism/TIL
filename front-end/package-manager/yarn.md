# Yarn
> Yarn 은 Facebook, Google, Exponent, Tilde 가 공동 개발한 패키지 매니저로 빠르고 안정적으로 패키지를 설치할 수 있다.

## Install
```sh
$ curl -o- -L https://yarnpkg.com/install.sh | bash
# or
$ npm install — global yarn
```

## Usage
```sh
$ yarn
$ yarn install
$ yarn init
$ yarn add [package]
$ yarn upgrade [package]
$ yarn remove [package]
$ yarn global [work]
```
- `yarn` : `package.json` 에 있는 모든 의존성 설치하기
- `yarn install` : `yarn` 의 알리어스
  - `npm install`, `npm install [package]` 와 같이 `package.json` 에 있는 패키지 전체를 설치하거나, 특정 패키지를 설치하는 `npm` 과는 달리 `yarn install` 은 `package.json` 혹은 `yarn.lock` 에 있는 모든 패키지를 설치한다.
- `yarn init` : `npm` 저장소 초기화
- `yarn add [PACKAGE]` : `npm` 패키지 설치
  - `npm i -S` 와 같이 `package.json` 의 의존성에 `[PACKAGE]` 가 추가된다.
  - `yarn add --dev [PACKAGE]` 와 같이 `--dev` 옵션을 주면, 개발 의존성에 `[PACKAGE]` 가 추가된다.
- `yarn upgrade [PACKAGE]` : `npm` 패키지 업그레이드
  - `npm update [PACKAGE]` 와 같다.
- `yarn remove [PACKAGE]` : `npm` 패키지 삭제
- `yarn global work` : 전역 `yarn`, `npm` 에서는 플래그로 `-g` 또는 `--global` 를 써주면 되지만, `yarn` 은 `yarn` 뒤에 `global` 이라고 명시적으로 전역에 관한 작업을 수행한다고 써줘야 한다.
  - `work` 에는 `add`, `bin`, `ls`, `remove` 가 올 수 있다.

## NPM vs Yarn
__NPM__
- `npm` 은 빠르지 않고, 일관성이 적다.
- `npm` 은 패키지 설치 시 코드 실행을 허용하므로 보안적인 문제가 있다.
- `npm` 에서는 패키지를 순차적으로 설치한다.
- `npm install [package]` 명령을 수행한 뒤, 설치된 패키지를 의존관계에 따라 계단형으로 보여준다.

__Yarn__
- `yarn.lock` 파일을 만듬으로써 `package.json` 의 버전 범위를 유지하면서 다른 컴퓨터에서도 완전 동일한 패키지를 설치할 수 있다.
  - `npm` 의 `npm shrinkwrap` 명령은 `npm install` 수행 이전에 읽는 `npm-shrinkwrap.json` 을 생성한다.
  - 잠금 파일을 만드는 것까진 `yarn` 과 동일하다. 하지만, `yarn` 은 항상 `yarn.lock` 파일을 생성/업데이트 하는 반면, `npm` 은 자동으로 잠금 파일을 생성하지는 않는다.
- `yarn` 은 패키지 설치 작업을 병렬로 실행한다.
- `yarn add [package]` 명령을 수행한 뒤, 설치된 패키지를 간단히 나열한다.

## 참고
- [Yarn Docs](https://yarnpkg.com/en/docs/)


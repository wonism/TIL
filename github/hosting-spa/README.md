# Github Pages 에 SPA 호스팅하기

> [https://github.com/rafrex/spa-github-pages](https://github.com/rafrex/spa-github-pages) 를 참고하였습니다.

<p>페이지로 이동하기 <a href="https://wonism.github.io">https://wonism.github.io</a></p>

## 세팅

```sh
# 디렉토리 생성
$ mkdir USERNAME.github.io && cd USERNAME.github.io

# 깃 클로닝
$ git clone https://github.com/rafrex/spa-github-pages .
# 혹은
$ git clone https://github.com/wonism/wonism.github.io-react .

# 패키지 설치
$ yarn
# 또는
$ npm i

# 커밋
$ rm -rf .git
$ git init .
$ git commit -am 'add SPA for github pages'
# 이하 생략 ...
```

## 개발서버 열기
```sh
$ npm run dev
```

## React 애플리케이션 빌드하기
```sh
$ npm run bundle
```
- <b>참고</b> : Long term caching 을 해결하기 위해 번들링할 때, `hash` 를 붙이고 있다. 번들링하기 전에 `npm run clean` 으로 이전 버전의 `js` 파일을 삭제해야 한다.

## 정적자원 관리하기
```sh
# 배포용
$ NODE_ENV=production gulp

# 개발용
$ NODE_ENV=development gulp
```

<p>정적 파일, `index.html` 의 `meta 태그` 등은 본인의 취향대로 수정한다.</p>


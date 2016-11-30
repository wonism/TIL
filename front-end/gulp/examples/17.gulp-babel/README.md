# 17. Babel with Gulp
- babel 을 통해 `js` 를 `js`로 트랜스파일링한다.

## Steps
- 먼저, `js/example.js` 를 생성하고, ECMA 2015 문법으로 코드를 작성한다.
```sh
$ mkdir js && touch js/example.js
```
```js
(() => {
  const arr = [1, 2, 3];
  arr.map((el, i) => {
    console.log(`${ i + 1 } => ${ el }`);
    return el;
  });
})();
```

- 그 다음, `gulp-babel` 과 `babel-preset-es2015` 를 설치한다.
```sh
$ npm i -D gulp-babel babel-preset-es2015
# 또는
$ yarn add --dev gulp-babel babel-preset-es2015
```

- gulpfile.js 를 작성한다.
```js
var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('babel', function() {
  return gulp
    .src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['babel']);
```

- `gulp` 명령어로 js 를 트랜스파일한다.
```sh
$ gulp
[14:12:40] Using gulpfile
~/project/TIL/front-end/gulp/examples/17.gulp-babel/gulpfile.js
[14:12:40] Starting 'babel'...
[14:12:40] Finished 'babel' after 285 ms
[14:12:40] Starting 'default'...
[14:12:40] Finished 'default' after 20 μs
```

- `dist` 디렉토리에 다음과 같이 자바스크립트 파일이 생성된다.
```js
"use strict";

(function () {
  var arr = [1, 2, 3];
  arr.map(function (el, i) {
    console.log(i + 1 + " => " + el);
    return el;
  });
})();
```

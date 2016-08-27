# 02. Uglify
- js 파일을 압축한다.
  - 용량을 줄임으로써, HTTP request 에 대해 빠르게 response 할 수 있게 한다.

## Steps
- 먼저, js 폴더를 만든 뒤 uglify&minus;me.js 라는 파일을 만든다.
```sh
$ touch uglify-me.js
```
```js
/***** js/uglify-me.js *****/
function uglify() {
  console.log('Uglify Me!');
  var i = 0;
  console.log(i);
}
```

- gulpfile.js 를 작성한다.
  - gulp.src 의 인자로 오는 js 폴더의 js 파일들을 가지고 태스크를 수행한다.
  - pipe 로 작업을 연결하면서 dest 로 목적지를 설정한다.
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var uglify = require('gulp-uglify');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('default', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});
```

- gulp 명령을 실행하면 dist/js 경로 내에 uglify 된 파일이 생성된다.
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 64 ms
```
```sh
$ vi dist/js/uglify-me.js
```
```js
/***** dist/js/uglify-me.js *****/
function uglify(){console.log("Uglify Me!");var o=0;console.log(o)}
```


# 03. Separate Task
- 태스크를 분리한다.

## Steps
- 태스크를 분리하고,
- default 태스크 두 번째 인자에 function 대신 태스크 명들로 이루어진 배열을 전달한다.
  - 배열 안의 태스크들을 차례로 수행한다.
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var uglify = require('gulp-uglify');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['hello', 'scripts']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'hello'...
Hello, World!
[00:00:00] Finished 'hello' after 112 μs
[00:00:00] Starting 'scripts'...
[00:00:00] Finished 'scripts' after 79 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 7.24 μs
```
```sh
$ vi dist/js/uglify-me.js
```
```js
/***** dist/js/uglify-me.js *****/
function uglify(){console.log("Uglify Me!");var o=0;console.log(o)}
```


# 09. gulp-rename
- 파일 이름을 변경한다.

## Steps
```js
/***** js/hello.js *****/
function uglify() {
  console.log('Uglify Me!');
  var i = 0;
  console.log(i);
}
```
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(concat('all.js'))
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
[00:00:00] Finished 'hello' after 109 μs
[00:00:00] Starting 'scripts'...
[00:00:00] Finished 'scripts' after 78 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 7.81 μs
```
```sh
$ vi dist/js/uglify-me.min.js
```
```js
/***** dist/js/all.js *****/
function uglify(){console.log("Uglify Me!");var o=0;console.log(o)}
```


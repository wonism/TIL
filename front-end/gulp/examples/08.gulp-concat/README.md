# 08. gulp-concat
- js, css 등의 파일을 합쳐준다.

## Steps
- js 폴더 내에 js 파일들을 만든다.
```js
/***** js/hello.js *****/
function hello() {
  console.log('Hello, ');
}
```
```js
/***** js/world.js *****/
function world() {
  console.log('World!');
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
$ vi dist/js/all.js
```
```js
/***** dist/js/all.js *****/
function hello(){console.log("Hello, ")}function world(){console.log("World!")}
```


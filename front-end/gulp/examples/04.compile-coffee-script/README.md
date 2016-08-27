# 04. Compile Coffee Script
- Coffee Script 를 컴파일한다.

## Steps
```coffee
###
# js/hello-coffee.coffee
###
hello = ->
  console.log 'Hello, Coffee!'
  return

hello()
```
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

var paths = {
  coffee: 'js/**/*.coffee',
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('default', ['hello', 'scripts']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'hello'...
Hello, World!
[00:00:00] Finished 'hello' after 110 μs
[00:00:00] Starting 'scripts'...
[00:00:00] Finished 'scripts' after 91 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 7.57 μs
```
```sh
$ vi dist/js/hello-coffee.js
```
```js
/***** dist/js/hello-coffee.js *****/
(function(){var o;o=function(){console.log("Hello, Coffee!")}}).call(this);
```


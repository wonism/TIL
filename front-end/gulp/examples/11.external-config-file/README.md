# 11. Use External config file
- 외부 설정파일을 사용한다.

## Steps
- 폴더를 만들고, config 파일을 생성한다.
```sh
$ mkdir config
$ mkdir -p desktop/js & mkdir -p mobile/js
$ touch desktop/js/main.js & touch mobile/js/main.js
$ touch gulp-config.json & touch gulpfile.js
```
```js
/***** config/gulp-config.json *****/
{
  desktop: {
    js: 'desktop/js/**/*.js'
    dist: 'dist/desktop/js'
  },
  mobile: {
    js: 'mobile/js/**/*.js',
    dist: 'dist/mobile/js'
  }
}
```
```js
/***** desktop/js/main.js *****/
function desktop () {
  console.log('I\'m desktop.');
}
```
```js
/***** mobile/js/main.js *****/
function mobile() {
  console.log('I\'m mobile.');
}
```
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('./config/gulp-config.json');

function setConfig(cfg) {
  return gulp.src(cfg.js)
    .pipe(uglify())
    .pipe(gulp.dest(cfg.dist));
}

gulp.task('scripts', function () {
  setConfig(config.desktop);
  setConfig(config.mobile);
});

gulp.task('default', ['scripts']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'scripts'...
[00:00:00] Finished 'scripts' after 78 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 7.81 μs
```
```js
/***** dist/desktop/js/main.js *****/
function desktop(){console.log("I'm desktop.")}
```
```js
/***** dist/mobile/js/main.js *****/
function mobile(){console.log("I'm mobile.")}
```


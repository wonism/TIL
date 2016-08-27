# 10. gulp-sourcemaps
- 파일 이름을 변경한다.
- gulp&minus;sourcemaps 는 concat, uglify 등을 통해 변형된 소스 코드 또는 SASS,
  Coffee Script 등의 소스 코드를 컴파일한 결과로 생성된 소스 코드와 원래
소스 코드 사이의 source map 을 작성해준다.
- Source map 에는 변형된 코드의 어느 부분이 기존 소스 코드의 어느 부분에
  해당하는 지에 대한 정보가 담긴다.

## Steps
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
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    /***** source map init *****/
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    /***** source map write *****/
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['scripts']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'scripts'...
[00:00:00] Finished 'scripts' after 86 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 26 μs
```
```sh
$ vi dist/js/all.min.js
```
```js
/***** dist/js/all.js *****/
function hello(){console.log("Hello, ")}function world(){console.log("World!")}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLmpzIiwid29ybGQuanMiXSwibmFtZXMiOlsiaGVsbG8iLCJjb25zb2xlIiwibG9nIiwid29ybGQiXSwibWFwcGluZ3MiOiJBQUFBLFFBQUFBLFNBQ0FDLFFBQUFDLElBQUEsV0NEQSxRQUFBQyxTQUNBRixRQUFBQyxJQUFBIiwiZmlsZSI6ImFsbC5taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoZWxsbygpIHtcbiAgY29uc29sZS5sb2coJ0hlbGxvLCAnKTtcbn1cbiIsImZ1bmN0aW9uIHdvcmxkKCkge1xuICBjb25zb2xlLmxvZygnV29ybGQhJyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
```


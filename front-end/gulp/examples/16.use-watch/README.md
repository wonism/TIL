# 16. use-watch
- Gulp 에 내장된 기능인 watch 는 파일 변경을 실시간으로 감지하면서 변화가 생길 때마다 정해진 작업을 수행한다.
- gulp watch 를 통해 실행할 수 있다.
## Steps
- gulp.watch 다음을 인자로 받는다.
  - 첫 번째 인자로 변경을 감지할 경로
  - 두 번째 인자로 수행할 작업

```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
  css: 'css/**/*.scss',
  dist: 'dist/'
};

gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('watch', function() {
  gulp.watch('css', ['sass']);
});

gulp.task('default', ['sass']);
```
```
$ gulp watch

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'watch'...
[00:00:00] Finished 'watch' after 8.07 ms

# gulp watch 를 실행하면 대기 모드로 진입하며,
# 파일 변화가 일어나면 태스크를 수행한다.

[00:00:00] Starting 'sass'...
[00:00:00] Finished 'sass' after 32 ms
[00:00:00] Starting 'sass'...
[00:00:00] Finished 'sass' after 8.48 ms

# control + c 로 종료한다.
```

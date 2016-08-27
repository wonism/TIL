# 13. gulp-autoprefixer
- 벤더 프리픽스를 자동으로 생성한다.
  - 예를 들면, &minus;webkit&minus;border&minus;radius 등..
## Steps
- browsers 는 어떤 브라우저까지 벤더 프리픽스를 생성할 것인지 설정한다.
- ( + SASS 에 mix-in 을 사용하는 것이 더 좋은 것 같다..)
```css
/***** css/style.css *****/
button {
  display: flex;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  opacity: .8;
  appearance: none;
}
```
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  css: 'css/**/*.css',
  dist: 'dist/'
};

gulp.task('stylesheets', function () {
  return gulp.src(paths.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('stylesheets-with-sourcemaps', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['stylesheets']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'stylesheets'...
[00:00:00] Finished 'stylesheets' after 81 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 24 μs
```
```css
/***** dist/css/style.css *****/
button {
  display: -ms-flexbox;
  display: flex;
  border-radius: 3px;
  opacity: .8;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
```
- sourcemaps 와 같이 사용할 수도 있다.
```
$ gulp stylesheets-with-sourcemaps

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'stylesheets-with-sourcemaps'...
[00:00:00] Finished 'stylesheets-with-sourcemaps' after 100 ms
```
```css
/***** dist/css/style.css *****/
button {
  display: -ms-flexbox;
  display: flex;
  border-radius: 3px;
  opacity: .8;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFjO0VBQWQsY0FBYztFQUVkLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1oseUJBQWlCO0VBQWpCLHNCQUFpQjtFQUFqQixpQkFBaUI7Q0FDbEIiLCJmaWxlIjoic3R5bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgb3BhY2l0eTogLjg7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ== */
```

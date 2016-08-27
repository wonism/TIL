# 04. Minify CSS
- SASS(SCSS) 를 컴파일한다.

## Steps
```css
/***** css/style.scss *****/
body {
  margin: 0;
  font-size: 62.5% !important;
}

h1 {
  font-weight: 900;
}
```
```js
/***** gulpfile.js *****/
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var paths = {
  css: 'css/**/*.scss',
  dist: 'dist/'
};

gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['sass']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'sass'...
[00:00:00] Finished 'sass' after 25 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 23 μs
```
```sh
$ vi dist/css/style.css
```
```css
/***** dist/css/style.css *****/
body{background-color:#fdadcd}body p{color:#d0c0f0;font-style:italic}
```


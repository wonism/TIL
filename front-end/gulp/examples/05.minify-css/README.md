# 04. Minify CSS
- CSS 를 minify 한다.

## Steps
```css
/***** css/style.css *****/
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
var cleanCSS = require('gulp-clean-css');

var paths = {
  css: 'css/**/*.css',
  dist: 'dist/'
};

gulp.task('minify-css', function () {
  return gulp.src(paths.css)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['minify-css']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'minify-css'...
[00:00:00] Finished 'minify-css' after 55 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 24 μs
```
```sh
$ vi dist/css/style.css
```
```css
/***** dist/css/style.css *****/
body{margin:0;font-size:62.5%!important}h1{font-weight:900}
```


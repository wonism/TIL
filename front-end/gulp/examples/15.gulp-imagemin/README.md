# 15. gulp-imagemin
- 이미지를 압축해준다.
## Steps
- 압축할 이미지를 가져온다.
- 압축 옵션에는 여러 가지가 있다.
  - [gulp&minus;imagemin](https://github.com/sindresorhus/gulp-imagemin)
```js
/***** gulpefile.js *****/
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
  img: 'img/**/*',
  dist: 'dist/'
};

gulp.task('imagemin', function () {
  return gulp.src(paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('default', ['imagemin']);
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'imagemin'...
[00:00:00] gulp-imagemin: Minified 1 image (saved 0 B - 0%)
[00:00:00] Finished 'imagemin' after 478 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 36 μs

$ ls -l img/heartocat.png
-rw-r--r--@ 1 user staff  9696  6 23 09:47 img/heartocat.png

$ ls -l dist/img/heartocat.png
-rw-r--r--  1 user staff  9696  6 23 09:55 dist/img/heartocat.png
```

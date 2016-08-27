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


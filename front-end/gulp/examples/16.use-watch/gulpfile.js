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
  gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['sass']);


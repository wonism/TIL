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


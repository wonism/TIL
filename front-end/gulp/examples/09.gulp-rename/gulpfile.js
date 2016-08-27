var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['hello', 'scripts']);


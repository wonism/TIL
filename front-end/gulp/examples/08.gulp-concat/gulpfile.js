var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['hello', 'scripts']);


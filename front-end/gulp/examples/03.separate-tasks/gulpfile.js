var gulp = require('gulp');
var uglify = require('gulp-uglify');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('default', ['hello', 'scripts']);


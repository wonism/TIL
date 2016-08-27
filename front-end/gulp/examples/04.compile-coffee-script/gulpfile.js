var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

var paths = {
  coffee: 'js/**/*.coffee',
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('hello', function () {
  console.log('Hello, World!');
});

gulp.task('default', ['hello', 'scripts']);


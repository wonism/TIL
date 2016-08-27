var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(plumber({
      errorHandler: getErrorLog
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + 'js'));
});

var getErrorLog = function (err) {
  console.log(err);
}

gulp.task('default', ['scripts']);


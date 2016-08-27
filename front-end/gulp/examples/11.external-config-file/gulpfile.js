var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('./config/gulp-config.json');

function setConfig(cfg) {
  return gulp.src(cfg.js)
    .pipe(uglify())
    .pipe(gulp.dest(cfg.dist));
}

gulp.task('scripts', function () {
  setConfig(config.desktop);
  setConfig(config.mobile);
});

gulp.task('default', ['scripts']);


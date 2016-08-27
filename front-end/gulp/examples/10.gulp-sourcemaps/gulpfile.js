var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    /***** source map init *****/
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    /***** source map write *****/
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['scripts']);


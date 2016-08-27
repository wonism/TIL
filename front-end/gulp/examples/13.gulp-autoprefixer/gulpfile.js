var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  css: 'css/**/*.css',
  dist: 'dist/'
};

gulp.task('stylesheets', function () {
  return gulp.src(paths.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('stylesheets-with-sourcemaps', function () {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['stylesheets']);


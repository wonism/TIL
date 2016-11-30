var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
  js: 'js/**/*.js',
  dist: 'dist/'
};

gulp.task('babel', function() {
  return gulp
    .src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('default', ['babel']);


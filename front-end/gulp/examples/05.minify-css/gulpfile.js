var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

var paths = {
  css: 'css/**/*.css',
  dist: 'dist/'
};

gulp.task('minify-css', function () {
  return gulp.src(paths.css)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['minify-css']);


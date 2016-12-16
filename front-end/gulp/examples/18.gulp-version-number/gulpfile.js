var gulp = require('gulp');
var version = require('gulp-version-number');
var path = require('path');

var versionConfig = {
  value: '%MDS%',
  append: {
    key: 'v',
    to: ['css', 'js'],
  },
};


gulp.task('html', function () {
  return gulp.src(path.join(__dirname, 'index.html'))
    .pipe(version(versionConfig))
    .pipe(gulp.dest(path.join(__dirname)));
});


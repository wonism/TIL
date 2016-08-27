var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('logging', function() {
  gutil.log('Strings', 'are', gutil.colors.yellow('concatenated.'));
  gutil.beep();

  var newPath = gutil.replaceExtension('sample.txt', '.js');
  gutil.log('Replace extension : ', newPath);

  var opt = {
    name: 'wonism',
    file: 'js/uglify-me.js'
  };

  var template = gutil.template('\nname : <%= name %>\nfile: <%= file %>', opt)
  gutil.log('Template :', gutil.colors.red(template));
});

gulp.task('default', ['logging']);


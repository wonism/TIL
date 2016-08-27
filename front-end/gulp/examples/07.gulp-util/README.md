# 07. gulp-util (Logging)
- 로깅을 한다.

## Steps
- colors 를 통해 color 를 설정할 수 있다.
- replaceExtension 함수로 확장자를 변경하여 반환한다.
  - 첫 번째 인자는 변경될 파일
  - 두 번째 인자는 변경할 확장자
- template 을 통해 템플릿을 만들 수 있다.
```js
/***** gulpfile.js *****/
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
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'logging'...
[00:00:00] Strings are concatenated.
[00:00:00] Replace extension :  sample.js
[00:00:00] Template :
name : wonism
file: js/uglify-me.js
[00:00:00] Finished 'logging' after 4.6 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 12 μs
```


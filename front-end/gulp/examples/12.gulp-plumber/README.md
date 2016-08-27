# 12. gulp-plumber (에러 핸들링)
## Steps
- 에러 메시지가 출력되도록 js 파일을 만든다.
```js
/***** js/test-plumber.js *****/
(에러))
```
```js
/***** gulpefile.js *****/
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
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'scripts'...
{ [Error: /Users/jaewon/Desktop/gulp/12.gulp-plumber/js/plumber-test.js:
Unexpected token: punc ())]
  message:
'/Users/jaewon/Desktop/gulp/12.gulp-plumber/js/plumber-test.js:
Unexpected token: punc ())',
  fileName:
'/Users/jaewon/Desktop/gulp/12.gulp-plumber/js/plumber-test.js',
  lineNumber: 1,
  stack: 'Error\n    at new JS_Parse_Error (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:1526:18)\n    at js_error (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:1534:11)\n    at croak (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2026:9)\n    at token_error (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2034:9)\n    at unexpected (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2040:9)\n    at semicolon (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2060:56)\n    at simple_statement (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2240:73)\n    at eval (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2125:24)\n    at eval (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2073:24)\n    at eval (eval at <anonymous>
(/Users/jaewon/Desktop/gulp/node_modules/uglify-js/tools/node.js:22:1),
<anonymous>:2827:23)',
  showStack: false,
  showProperties: true,
  plugin: 'gulp-uglify' }
[00:00:00] Finished 'scripts' after 63 ms
[00:00:00] Starting 'default'...
[00:00:00] Finished 'default' after 54 μs
```


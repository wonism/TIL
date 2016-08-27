# 01. Hello, World!
```js
/***** gulpefile.js *****/
var gulp = require('gulp');

gulp.task('default', function () {
  console.log('Hello, World!');
});
```
```
$ gulp

[00:00:00] Using gulpfile PATH/gulpfile.js
[00:00:00] Starting 'default'...
Hello, World!
[00:00:00] Finished 'default' after 106 μs
```

- gulp 명령어를 실행하면 default 태스크를 실행한다.


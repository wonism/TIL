# 18. Solution for long term caching
- `html` 파일에서 정적 파일의 경로 뒤에 `version 코드` 를 삽입함으로써 정적 파일의 long term caching 문제를 해결한다.

## Steps
- 먼저, `index.html` 를 생성하고, `<link>` 태그와 `<script>` 태그 등을 작성한다.
```sh
$ vi index.html
```
```html
<!DOCTYPE>
<html>
<head>
  <link rel="stylesheet" href="/assets/css/application.min.css" />
</head>
<body>
  <script type="text/javascript" src="/assets/js/application.min.js"></script>
</body>
</html>
```

- 그 다음, `gulp-version-number` 를 설치한다.
```sh
$ npm i -D gulp-version-number
# 또는
$ yarn add --dev gulp-version-number
```

- gulpfile.js 를 작성한다.
```js
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
  return gulp.src(path.join(__dirname, SOUCE_DIRECTORY, 'index.html'))
    .pipe(version(versionConfig))
    .pipe(gulp.dest(path.join(__dirname, DIST_DIRECTORY)));
});
```

- `gulp html` 명령어를 수행한다.
```sh
$ gulp html
[18:32:54] Using gulpfile ~/project/TIL/front-end/gulp/examples/18.gulp-version-number/gulpfile.js
[18:32:54] Starting 'html'...
[18:32:54] Finished 'html' after 29 ms
```

- `html` 파일을 확인해보면, 다음과 같이 `query string` 이 붙은 것을 볼 수 있다.
```html
<!-- CSS -->
<link rel="stylesheet" href="/assets/css/application.min.css?v=8c3d2dc707926757155239753d8698fe" />
<!-- Java Script -->
<script type="text/javascript" src="/assets/js/application.min.js?v=8c3d2dc707926757155239753d8698fe"></script>
```


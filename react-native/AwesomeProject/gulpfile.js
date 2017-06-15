const gulp = require('gulp');
const eslint = require('gulp-eslint');
const paths = [
  '**/*.js',
  '!__tests__/**',
  '!node_modules/**',
  '!gulpfile.js'
];

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js', 'hint']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('lint', () => gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('default', ['lint'], () => {
  gulp.watch(paths, ['lint']);
});


var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins(
  // Options
);

var paths = {
  css: 'css/**/*.scss',
  dist: 'dist/'
};

gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.cleanCss({
      compatibility: 'ie8'
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('default', ['sass']);


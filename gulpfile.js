var gulp = require('gulp'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    pkg = require('./package.json'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    aliasify = require('aliasify');

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return browserify(pkg.main)
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('scss', function () {
  gulp.src('src/css/scss/stalker.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('watch', ['js', 'scss', 'html'], function() {
  gulp.watch(['src/js/**/*.js'], ['js']);
  gulp.watch(['src/css/**/*.scss'], ['scss']);
  gulp.watch(['src/*.html'], ['html']);
});


gulp.task('default', ['watch']);
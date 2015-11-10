var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var pkg = require('./package.json');
var source = require('vinyl-source-stream');
var aliasify = require('aliasify');

gulp.task('js', function () {
  return browserify(pkg.main)
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch', ['js'], function() {
    gulp.watch(['src/js/**/*.js'], ['js']);

});

gulp.task('default', ['watch']);
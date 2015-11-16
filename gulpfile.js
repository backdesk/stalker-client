var gulp = require('gulp'),
	gutil = require('gulp-util'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	pkg = require('./package.json'),
	source = require('vinyl-source-stream'),
	aliasify = require('aliasify');

gulp.task('js', function () {
  return browserify(pkg.main)
    .transform(babelify)
    .bundle()
    // .on('error', console.error.bind(console))
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch', ['js'], function() {
    gulp.watch(['src/js/**/*.js'], ['js']);

});



gulp.task('default', ['watch']);
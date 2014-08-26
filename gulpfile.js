'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  expressService = require('gulp-express-service');

gulp.task('default', function () {
  gulp.start('build');
});

gulp.task('lint', function () {
  return gulp.src(['app/public/scripts/**/*.js', 'test/**/*.js', 'app/server/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .on('error', function () {
      // Make sure failed tests cause gulp to exit non-zero
      process.exit(1);
    });
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  return gulp.src(['app/public/index.html'])
    .pipe(wiredep({
      directory: 'app/public/bower_components',
      exclude: [ /bootstrap/, /jquery/ ]
    }))
    .pipe(gulp.dest('app/public'));
});

gulp.task('server', function () {
  return gulp.src('app/index.js')
  .pipe(expressService({file: './app/index.js', NODE_ENV: 'DEV'}));
});

gulp.task('watch', ['server'], function () {
  gulp.watch(['app/**/*.js'], ['server']);
});

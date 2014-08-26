'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  expressService = require('gulp-express-service'),
  publicPath = 'app/public',
  jsPublicFiles = [publicPath + '/scripts/**/*.js', 'test/**/*.js', 'app/server/**/*.js'],
  jsServerFiles = ['app/**/*.js', '!app/public/*'],
  lessFiles = [publicPath + '/styles/**/*.less'];

gulp.task('default', function () {
  gulp.start('build');
});

gulp.task('lint', function () {
  return gulp.src(jsPublicFiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('less', function () {
  return gulp.src(lessFiles)
    .pipe($.concat('main.less'))
    .pipe($.less({cleancss: true, compress: true}))
    .on('error', function () {
      $.util.log($.util.colors.red('Invalid less'));
    })
    .pipe($.autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest(publicPath + '/styles'));
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  return gulp.src([publicPath + '/index.html'])
    .pipe(wiredep({
      directory: publicPath + '/bower_components',
      exclude: [ /bootstrap/, /jquery/ ]
    }))
    .pipe(gulp.dest(publicPath));
});

gulp.task('index', ['wiredep', 'less']);

gulp.task('server', function () {
  return gulp.src('app/index.js')
  .pipe(expressService({file: './app/index.js', NODE_ENV: 'DEV'}));
});

gulp.task('watch', ['server', 'lint', 'less', 'index'], function () {
  gulp.watch(jsServerFiles, ['server']);
  gulp.watch(lessFiles, ['less']);
  gulp.watch(jsPublicFiles, ['lint']);
});

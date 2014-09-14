'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  expressService = require('gulp-express-service'),
  clientPath = 'app/public',
  jsClientTestFiles = clientPath + '/scripts/**/*-spec.js',
  jsClientFiles = [clientPath + '/scripts/**/*.js', '!' + jsClientTestFiles],
  jsServerFiles = ['app/**/*.js', '!app/public/*'],
  jsFiles = 'app/**/*.js',
  lessFiles = clientPath + '/styles/**/*.less';

gulp.task('default', function () {
  gulp.start('build');
});

gulp.task('lint', function () {
  return gulp.src(jsClientFiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src('undefined.js')
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('less', function () {
  return gulp.src(lessFiles)
    .pipe($.concat('main.less'))
    .pipe($.less({cleancss: true, compress: true}))
    .on('error', function () {
      $.util.log($.util.colors.red('Invalid less'));
    })
    .pipe($.autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest(clientPath + '/styles'));
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  return gulp.src([clientPath + '/index.html'])
    .pipe(wiredep({
      directory: clientPath + '/bower_components',
      exclude: [
        /\/bootstrap\//,
        /jquery/
      ]
    }))
    .pipe(gulp.dest(clientPath));
});

gulp.task('index', ['wiredep', 'less']);

gulp.task('server', function () {
  return gulp.src('app/index.js')
  .pipe(expressService({file: './app/index.js', NODE_ENV: 'DEV'}));
});

gulp.task('watch', ['server', 'lint', 'less', 'index'], function () {
  gulp.watch(jsServerFiles, ['server']);
  gulp.watch(lessFiles, ['less']);
  gulp.watch(jsFiles, ['lint']);
  gulp.watch(jsClientTestFiles, ['test']);
});

gulp.task('clean-dist', function () {
  return gulp.src(['dist'], {
      read: false
    })
    .pipe($.rimraf());
});


gulp.task('build-public', ['index'/*, 'ngtemplates'*/], function () {
  var jsAppFilter = $.filter('**/scripts.js'),
    jsVendorFilter = $.filter('**/vendor.js'),
    cssVendorFilter = $.filter('**/vendor.css');

  return gulp.src(['app/public/*.html', '!app/public/bower_components/**'])
    .pipe($.useref.assets())
    .pipe(cssVendorFilter)
    .pipe($.minifyCss())
    .pipe(cssVendorFilter.restore())
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsAppFilter.restore())
    .pipe(jsVendorFilter)
    .pipe($.uglify())
    .pipe(jsVendorFilter.restore())
    .pipe($.rev())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist/public'));
});

gulp.task('build-server', function () {
  gulp.src(['app/server/*'])
    .pipe(gulp.dest('dist/server'));
});

gulp.task('build', ['clean-dist', 'build-public', 'build-server']);

gulp.task('zip', ['build'], function () {
  return gulp.src('dist/**/*')
    .pipe($.zip('release.zip'))
    .pipe(gulp.dest('dist'));
})

gulp.task('deploy', ['lint', 'test', 'zip'], function () {
  
})

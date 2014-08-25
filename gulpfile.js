var gulp = require('gulp'),
  expressService = require('gulp-express-service');

gulp.task('server', function () {
  return gulp.src('app/index.js')
  .pipe(expressService({file: './app/index.js', NODE_ENV: 'DEV'}));
});

gulp.task('watch', ['server'], function () {
  gulp.watch(['app/**/*.js'], ['server']);
});

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  return gulp.src('public/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: [ 'bower_components/angular/angular.js', 'bower_components/angular-scenario/angular-scenario' ],
      dependencies: true,
      devDependencies: false
    }))
    .pipe(gulp.dest('app'));
});

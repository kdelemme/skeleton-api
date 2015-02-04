var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
  return gulp.src('./lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('server', function () {
  nodemon({ script: 'index.js' })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('node process restarted!');
    });
});

gulp.task('default', ['server']);
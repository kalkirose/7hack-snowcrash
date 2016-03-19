var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({});

var config = require( '../gulp-config.js' );

module.exports = function() {

  return gulp.src(config.vendor_files.css.concat(config.app_files.css))
    .pipe(plugins.concatCss("bundle.css"))
    .pipe(gulp.dest('tmp/assets/'));

};


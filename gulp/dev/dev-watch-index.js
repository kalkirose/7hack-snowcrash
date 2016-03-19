var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var config = require( '../gulp-config.js' );

module.exports = function(cb) {
     // If index file changes, reinject sources and output to temporary build directory
    gulp.watch(config.app_files.index_html, ['dev-inject-sources']);
};

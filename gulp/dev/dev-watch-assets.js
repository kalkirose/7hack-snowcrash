var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var config = require( '../gulp-config.js' );

module.exports = function(cb) {
    gulp.watch([config.app_files.assets, config.vendor_files.assets], ['dev-copy-assets']);
};

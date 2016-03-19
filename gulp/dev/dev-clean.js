var gulp = require('gulp');
var del = require('del');

var config = require( '../gulp-config.js' );

module.exports = function(cb) {
    del(config.build_dir + '/*');
    cb();
};

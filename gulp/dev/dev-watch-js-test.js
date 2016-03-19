var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    // Explicitly include non-gulp plugins
    pattern: ['gulp-*', 'gulp.*', 'run-sequence']

});

var config = require( '../gulp-config.js' );

module.exports = function(cb) {
    var jsFiles = config.app_files.js.concat(config.app_files.app);
    gulp.watch(jsFiles, function() {
        plugins.runSequence('dev-build-js', 'dev-test');
    });
};

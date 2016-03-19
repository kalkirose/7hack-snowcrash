var gulp = require('gulp');

// Load Config
var config = require( './gulp/gulp-config.js' );

var plugins = require('gulp-load-plugins')({
    // Explicitly include non-gulp plugins
    pattern: ['gulp-*', 'gulp.*', 'run-sequence']

});

require('gulp-load-tasks')(config.gulp.dev.task_folder);

/**
 * Development Single Run Build
 */
gulp.task('dev-build', function(cb) {
    plugins.runSequence(['dev-build-js',  'dev-copy-assets', 'dev-copy-css'], ['dev-inject-sources', 'dev-inject-test'], cb);
});

/**
 * Development Watch
 */
gulp.task('dev-watch', ['dev-watch-js', 'dev-watch-index', 'dev-watch-assets']);


/*
 * Default Gulp Task: Development
 * Process:
 * - Clean build directory
 * - Initial develpoment build to temporary folder
 * - Nodemon starts express and monitors for server file changes
 * - Start Broswer Sync
 * - Parrallel Watches for source directory
 */
gulp.task('default', function (cb) {
    plugins.runSequence('dev-clean', 'dev-build', 'dev-watch', cb);
});


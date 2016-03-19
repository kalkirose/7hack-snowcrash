var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var config = require( '../gulp-config.js' );

module.exports = function(cb) {

    // Target file
    var target = gulp.src(config.app_files.index_html);

    // Source Patterns: read false to increase speed
    var sources = gulp.src(['*.js', '*.css'], {read: false,  cwd: config.dev.assets_dir });

    // return stream;
    return target.pipe(plugins.inject(sources, {addPrefix: 'assets'}))
    .pipe(gulp.dest(config.dev.build_dir));
};

var gulp = require('gulp');

// Load plugins
var plugins = require('gulp-load-plugins')({
    // Explicitly include non-gulp plugins
    pattern: ['gulp-*', 'gulp.*', 'streamqueue', 'jshint-stylish']

});

// Load Config
var config = require( '../gulp-config.js' );

console.log('Template Name', config.app.template_name);

module.exports = function(cb) {
    return plugins.streamqueue({objectMode: true},

        // App File
        gulp.src(config.app_files.app),

        // Src Files
        gulp.src(config.app_files.js)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(plugins.jshintStylish)),

        // App Template Files
        gulp.src(config.app_files.atpl)
            .pipe(plugins.ngHtml2js(
            {
               moduleName: config.app.template_name,
               stripPrefix: 'app/'
            }))
            // Temporary name provided for sort order
            .pipe(plugins.concat('__template.js'))
    )

    // Reorder pipe for correct concat
    .pipe(plugins.order([
        '*/**/__template.js',
        config.app_files.app.toString(),
        config.app_files.js.toString()
    ], {base: './'}))

    // Prepend the vendor files
    .pipe(plugins.addSrc.prepend(config.vendor_files.js))

    // Concat the pipe into a single file
    .pipe(plugins.concat(config.dev.source_filename))

    // Save to disk
    .pipe(gulp.dest(config.dev.assets_dir));
};


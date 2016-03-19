var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({});

var config = require( '../gulp-config.js' );

module.exports = function() {
    // Remove two from the length as the assets are defined as .../**/*
    // We only want to count the parts before the /**/*
    var parts = config.app_files.assets[0].toString().split("/").length - 2;

    return gulp.src(config.app_files.assets.concat(config.vendor_files.assets))
        .pipe(plugins.copy(config.dev.assets_dir, {prefix: parts}));
};


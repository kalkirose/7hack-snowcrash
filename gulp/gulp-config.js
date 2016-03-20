/**
* This file/module contains all configuration for the build process.
*/

var base_dir = 'src/client';
var moduleName = '7hack-snowcrash';

module.exports = {

    // Base src directory
    base_dir: base_dir,

    dev: {
        // Temporary Build Directory
        build_dir: 'tmp',
        // Temporary Assets Directory
        assets_dir: 'tmp/assets',
        //File name of the outputted javascript
        source_filename: 'source.js',
        // Filename of the main less file
        less_filename: 'main.less',
        // Filename of the processed less > css
        style_output_filename: 'main.css',
        // Directory for js and css maps
        map_dir: 'maps',
        // String used to determine browser support for auto-prefixer
        browser_support: 'last 2 versions'
    },

    // Main app config
    app: {
        // Template filename for html2js
        template_name: moduleName + '.templatesApp'
    },


    // Gulp Task Config
    gulp: {
        dev: {
            task_folder: 'gulp/dev'
        }
    },


    /*
     * All Source Files
     */
    app_files: {
        app: [
            base_dir + '/index.js'
        ],
        assets: [
            base_dir + '/assets/**/*'
        ],
        js: [
            base_dir + '/components/**/*.js'
        ],
        atpl: [
            base_dir + '/components/**/*.tpl.html'
        ],
        css: [
            base_dir + '/**/*.css'
        ],
        index_html: [
            base_dir + '/index.html'
        ],
        test_html: [
            base_dir + '/test.html'
        ]
    },

    /**
     * All Vendor Files
     */
    vendor_files: {
        js: [
            'src/client/lib/jwplayer/jwplayer.js',
            'src/client/lib/toaster/jquery.toaster.js',
            'node_modules/angular/angular.js',
            'node_modules/moment/moment.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/socket.io-client/socket.io.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        assets: [
            'client/lib/jwplayer/jwplayer.flash.swf'
        ]
    },
};

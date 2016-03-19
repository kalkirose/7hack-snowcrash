module.exports = function(cb) {
    var config = {
        build_dir: '.tmp',
        assets_dir: '.tmp/assets',
        img_dir: '.tmp/assets/img',
        svg_dir: '.tmp/assets/svg',
        sprites_dir: '.tmp/assets/sprites',
        source_filename: 'source.js',
        style_output_filename: 'main.css',
        map_dir: 'maps',
        browser_support: 'last 2 versions'
    };

    return config;
};

module.exports = function(grunt, options) {
    return {
        options: {
            sourceMap: false,
            loose: "all",
            modules: 'amd'
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'static/src/javascripts/',
                src: ['{bootstraps,projects}/**/*.js', 'core.js'],
                dest: 'static/src/javascripts/.tmp/'
            }]
        }
    };
};

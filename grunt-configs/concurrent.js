module.exports = function(grunt, options) {
    return {
        options: {
            logConcurrentOutput: true
        },
        compile: ['compile:js:true', 'compile:css:true'],
        sass: ['sass:old-ie', 'sass:ie9', 'sass:modern'],
        requireJS: ['requirejs:common','requirejs:crosswords', 'requirejs:sudoku', 'requirejs:image-content', 'requirejs:facia', 'requirejs:football', 'requirejs:preferences', 'requirejs:identity', 'requirejs:ophan', 'requirejs:admin', 'requirejs:video', 'requirejs:videoEmbed', 'requirejs:dev', 'requirejs:creatives']
    };
};

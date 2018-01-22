module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat: {
        // },
        watch: {
            scripts: {
                files: ['demo/**/*.js', 'demo/**/*.html', 'app.js', 'app/**/*.js'],
                tasks: ['dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        browserify : {
            dev : {
                src : ['app/**/*.js'],
                dest : './demo/js/bundle.js',
                options : {
                   // watch : true, // use watchify for incremental builds!
                  //  keepAlive : true, // watchify will exit unless task is kept alive
                    browserifyOptions : {
                        debug : true // source mapping
                    }
                }
            },
            dist : {
                src : ["<%= paths.src %>"],
                dest : "<%= paths.dest %>"
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');


    grunt.registerTask("dev", ["browserify:dev"]);
    grunt.registerTask('default', ['dev','watch']);
};
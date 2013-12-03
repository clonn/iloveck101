'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        mochaTest: {
          test: {
            options: {

              timeout: 30000,
              reporter: 'spec',
              require: [
                // 'coffee-script',
                'should'
              ]
            },
            src: ['test/**/*.js']
          }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
        },
        clean: {
            lib: '<%= jshint.lib.src %>',
            test: '<%= jshint.test.src %>'
        },
        coffee: {
            options: {
                bare: true
            },
            compile: {
                expand: true,
                flatten: false,
                cwd: 'src/',
                src: ['**/*.coffee'],
                ext: '.js'
            }
        },
        watch: {
            coffee: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee:compile']
            }
            // test: {
            //     files: '<%= jshint.test.src %>',
            //     // tasks: ['jshint:test', 'nodeunit']
            //     tasks: ['mochaTest']
            // },
        }

    });

    // These plugins provide necessary tasks.
    // grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // grunt.loadNpmTasks('grunt-docco2');
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Default tasks.
    grunt.registerTask('default', ['coffee', 'mochaTest']);
    grunt.registerTask('build', ['clean', 'coffee', 'jshint', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);

};

// Based on generator-angular 0.7.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        project: {
            // configurable paths
            src: 'src',
            name: 'ufo',
            cssDir: 'src/css',
            dist: 'dist/<%= project.name %>'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            assemble: {
                files: ['<%= project.src %>/{templates}/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble']
            },
            js: {
                files: ['<%= project.src %>/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= project.src %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= project.src %>/{,*/}*.html',
                    '<%= project.src %>/{,*/}*.css',
                    '<%= project.src %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= project.src %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= project.src %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= project.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= project.src %>/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= project.dist %>/*',
                        '!<%= project.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 60 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/.tmp/',
                    src: '{,*/}*.css',
                    dest: '<%= project.cssDir %>'
                }]
            }
        },

        cmq: {
          options: {
            log: false
          },
          your_target: {
            files: {
              '<%= project.src %>/css/': ['<%= project.src %>/css/*.css']
            }
          }
        },
        prettify: {
            options: {
                indent: 1,
                indent_char: '  ',
                wrap_line_length: 78,
                brace_style: 'expand',
            },
            init: {
                src: '<%= project.src %>/index_<%= project.name %>.html',
                dest: '<%= project.src %>/index_<%= project.name %>.html'
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                require: ['animation'],
                sassDir: '<%= project.src %>/sass',
                cssDir: '<%= project.src %>/.tmp/',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= project.src %>/images/<%= project.name %>',
                javascriptsDir: '<%= project.src %>/',
                fontsDir: '<%= project.src %>/css/',
                httpImagesPath: './',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: './',
                relativeAssets: false,
                noLineComments: true,
                assetCacheBuster: false,
                outputStyle: 'compact',
                raw: "Sass::Script::Number.precision = 10\n"
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= project.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= project.dist %>/{,*/}*.js',
                        '<%= project.dist %>/{,*/}*.css',
                        '<%= project.dist %>/{,*/}*.{png,jpg,jpeg,gif,webp}'
                        // '<%= project.dist %>/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= project.src %>/index_<%= project.name %>.html',
            options: {
                dest: '<%= project.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= project.dist %>/index_<%= project.name %>.html'],
            css: ['<%= project.dist %>/<%= project.name %>.css'],
            options: {
                assetsDirs: ['<%= project.dist %>', '<%= project.dist %>/**/']
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/images/<%= project.name %>',
                    src: '*.{png,jpg,jpeg,gif}',
                    dest: '<%= project.dist %>/images/<%= project.name %>'
                }, {
                    expand: true,
                    cwd: '<%= project.src %>/images/<%= project.name %>',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= project.dist %>/images/<%= project.name %>'
                }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= project.src %>',
                    src: '{,*/}*.svg',
                    dest: '<%= project.dist %>'
                }]
            }
        },
        // Replace Google CDN references
        // cdnify: {
        //   dist: {
        //     html: ['<%= project.dist %>/*.html']
        //   }
        // },
        // '<%= project.src %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    flatten: false,
                    expand: true,
                    cwd: '<%= project.src %>',
                    dest: '<%= project.dist %>',
                    src: [
                        '{,*/}*.swf',
                        '{,*/}*.mp3',
                        '{,*/}*.mp4',
                        '{,*/}*.ogg'
                    ]
                }, {
                    flatten: true,
                    expand: true,
                    cwd: '<%= project.src %>',
                    dest: '<%= project.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'index_<%= project.name %>.html',
                        '{,*/}*.ttf',
                        '{,*/}*.woff',
                        '{,*/}*.eot',
                        '{,*/}*.{webp}'
                    ]
                }, {
                    cwd: '.tmp/',
                    dest: '<%= project.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= project.src %>/css',
                dest: '.tmp/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },
        // zip banner
        compress: {
            main: {
                options: {
                    archive: '<%= project.dist %>/banner.zip'
                },
                files: [{
                        flatten: true,
                        src: ['<%= project.dist %>/*.html', '<%= project.dist %>/*.js', '<%= project.dist %>/*.css', '<%= project.dist %>/*.png', '<%= project.dist %>/*.jpg', '<%= project.dist %>/*.jpeg', '<%= project.dist %>/*.gif', '<%= project.dist %>/*.svg', '<%= project.dist %>/*.eot', '<%= project.dist %>/*.ttf', '<%= project.dist %>/*.woff', '<%= project.dist %>/*.{webp}'],
                        dest: '/'
                    }, // includes files in path
                    {
                        src: ['<%= project.dist %>/images/**'],
                        dest: '/'
                    }
                ]
            },
            assets: {
                options: {
                    archive: '<%= project.dist %>/assets.zip'
                },
                files: [{
                    src: ['<%= project.dist %>/assets/**'],
                    dest: '/'
                }]
            }
        },
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'cmq',
        'concat',
        'copy:dist',
        //'cdnify',
        'cssmin',
        'uglify',
        // 'rev',
        'usemin',
        // 'compress:main',
        // 'compress:assets',
    ]);

    grunt.registerTask('init', [
        'clean:dist',
        //'assemble',
        'concurrent:test',
        'autoprefixer',
        //'prettify:init'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};

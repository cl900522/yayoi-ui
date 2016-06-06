module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true, //不混淆变量名
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' + '/*! version: <%= pkg.version %> */\n' + '/*! author: <%= pkg.author %> */\n'
            },
            my_target: {
                files: [{
                    expand: true,
                    //相对路径
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/js/',
                    rename: function(dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/'));
                        var filename = src.substring(src.lastIndexOf('/'), src.length);

                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        var fileresult = dest + folder + filename + '.js';
                        grunt.log.writeln("现处理文件：" + src + "  处理后文件：" + fileresult);
                        return fileresult;
                    }
                }]
            },
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['css/**'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        autoprefixer: {
            build: {
                expand: false,
                cwd: '',
                src: ['build/css/yayoi-ui.css'],
                dest: 'build/css/yayoi-ui-auto.css'
            }
        },
        cssmin: {
            css: {
                src: 'build/css/yayoi-ui-auto.css',
                dest: 'build/css/yayoi-ui.css'
            }
        },
        clean: {
            build: {
                src: ["build/css/yayoi-ui-auto.css"]
            }
        },
        qunit: {
            files: ['html/**/*.html']
        }
    });

    // 加载任务的插件。
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ["uglify", "copy", "autoprefixer", "cssmin", "clean"]);
};

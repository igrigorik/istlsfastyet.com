'use strict';
const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        implementation: sass,
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '.',
          open: true
        }
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        options: {
          livereload: true,
        }
      },

      site: {
        files: ['index.html', 'css/style.css'],
        options: {
          livereload: true,
        }
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'release'
      },
      src: '**/*'
    },

    exec: {
      copy: 'cp -r *.{html,txt,ico} CNAME css images js release'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('deploy', ['build', 'exec:copy', 'gh-pages'])
  grunt.registerTask('default', ['build','connect:server','watch']);
}

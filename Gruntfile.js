module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
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

    exec: {
      copy: 'cp -r index.html robots.txt css images js release',
      push: 'rsync -rtzh --progress --delete release/ --rsh="ssh -p22" istlsfastyet:public'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('deploy', ['build', 'exec:copy', 'exec:push'])
  grunt.registerTask('default', ['build','connect:server','watch']);
}

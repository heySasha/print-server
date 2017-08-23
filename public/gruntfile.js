module.exports = function(grunt){

  grunt.initConfig({

    concat: {
      options: {
        separator: ' '
      },
        basic: {
        src: ['js/src/*.js'],
        dest: 'js/main.js',
      },
        extras: {
        src: ['css/src/*.css'],
        dest: 'css/main.css',
      }
    },

    imagemin: {
    dynamic: {
        options: {                      
          optimizationLevel: 6,          
        },
        files: [{
            expand: true,
            cwd: 'img/src/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/'
        }]
      }
    },

    sprite:{
      all: {
        src: 'img/src/*.{png,jpg}',
        dest: 'img/sprite.png',
        destCss: 'css/src/sprites.css'
      }
    },

    
    sass: {
    dist: {
      files: [{
          expand: true,
          cwd: 'styles',  //folder
          src: ['*.scss','*.sass'],
          dest: 'css/src/',  //folder with css
          ext: '-main.css'
        }]
      }
    },

    watch: {
      css:{
        files: ['css/src/*.css'],
        tasks: ['concat'],
      },
      sass: {
        files: ['styles/*.scss', 'styles/*.sass'],
        tasks: ['sass', 'concat'],
      },
      js:{
        files: ['js/src/*.js'],
        tasks: ['concat'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  /*grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  */

  grunt.registerTask('default', ['concat'/*,'imagemin', 'uglify', 'cssmin', 'sass'*/]);
};
"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**"
          ],
          dest: "build"
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "build/index.html": "build/index.html",
          "build/catalog.html": "build/catalog.html",
          "build/form.html": "build/form.html"
        }
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        cleanup: ["fill"]
      },
      sprite: {
        files: {
          "build/img/index-sprite.svg": [
            "source/img/icon-cart.svg",
            "source/img/icon-fb.svg",
            "source/img/icon-feature-*.svg",
            "source/img/icon-insta.svg",
            "source/img/icon-interior.svg",
            "source/img/icon-search.svg",
            "source/img/icon-toy.svg",
            "source/img/icon-twitter.svg",
            "source/img/logo-footer.svg",
            "source/img/logo-htmlacademy.svg"
          ],
          "build/img/catalog-sprite.svg": [
            "source/img/icon-cart.svg",
            "source/img/icon-fb.svg",
            "source/img/icon-insta.svg",
            "source/img/icon-video.svg",
            "source/img/icon-search.svg",
            "source/img/icon-twitter.svg",
            "source/img/logo-footer.svg",
            "source/img/logo-htmlacademy.svg"
          ],
          "build/img/form-sprite.svg": [
            "source/img/icon-cart.svg",
            "source/img/icon-fb.svg",
            "source/img/icon-insta.svg",
            "source/img/icon-mail.svg",
            "source/img/icon-phone.svg",
            "source/img/icon-search.svg",
            "source/img/icon-twitter.svg",
            "source/img/logo-footer.svg",
            "source/img/logo-htmlacademy.svg"
          ]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    uglify: {
      js: {
        files: {
          "build/js/index.min.js": ["source/js/*.js"],
          "build/js/catalog.min.js": ["source/js/menu.js", "source/js/modal.js", "source/js/picturefill.min.js"],
          "build/js/form.min.js": ["source/js/menu.js", "source/js/picturefill.min.js"]
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml", "htmlmin"]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      js: {
        files: ["source/js/**/*.js"],
        tasks: ["uglify"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", ["clean", "copy", "less", "postcss", "csso", "svgstore", "posthtml", "htmlmin", "uglify"]);
};

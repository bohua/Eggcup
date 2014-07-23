module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
			' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',

		// running `grunt less` will compile once
		less: {
			development: {
				options: {
					paths: ["./public/css"],
					yuicompress: true,
					sourceMap: true
				},
				files: {
					"./public/css/client.css": "./public/css/client.less"
				}
			}
		},
		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [
					{
						src: [
							"public/**/*.jade",
							"!public/src/platform/index/index.jade"
						],
						expand: true,
						ext: ".tpl.html"
					}
				]
			}
		},

		// running `grunt watch` will watch for changes
		watch: {
			files: [
				"./public/**/*.less"//,
				//"./public/**/*.jade"
			],
			tasks: ["less"]
		},

		build_dir: 'build',

		clean: {
			build: ['<%= build_dir %>/*']
		},

		copy: {
			build: {
				files: [
					{
						dest: '../build',
						src: ['**', '!attachments/*.*', '!logs/*.* ', '!uploads/*.*', '!Gruntfile.js'],
						expand: true
					}
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-html2js');

	grunt.registerTask('default', ['less', 'jade', 'watch']);

	grunt.registerTask('build', ['less', 'jade', 'clean:build', 'copy:build']);
};
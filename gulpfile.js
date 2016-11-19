"use strict";
var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open'); //Opens a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat-css'); //concatenates files
var count = require('gulp-count'); //Counts the number of matches in a statement for debugging
var lint = require('gulp-eslint'); //Check for syntax errors

var config = {
	port: 9005,
	devBase: 'http://localhost',
	paths: {
		html: './src/*.html',
		dist: './dist',
		js: './src/**/*.js',
		node_modules: './node_modules',
		css: [
			'./src/css/bootstrap.min.css',
			'./src/css/bootstrap-theme.min.css'
		],
		mainJs: './src/main.js'
	}
}

//Start a local dev server
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBase,
		livereload: true
	});
})

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html').pipe(open({ uri: config.devBase + ':' + config.port + '/'}));
});

//Get html files, put them in the dist folder, and then reload the dev server
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
})

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(count('## css-files selected'))
		.pipe(concat('bundle.css', { includePaths: [ config.paths.node_modules ]}))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
})

//Watch for html changes in the html folder and run the html task
gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.mainJs, ['js', 'lint']);

})

gulp.task('js', function() {
	browserify(config.paths.mainJs).transform(reactify).bundle().on('error', console.error.bind(console))
		.pipe(count('## js-files selected'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
})

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
	.pipe(lint({config: 'eslint.config.json'}))
	.pipe(lint.format());
})

//Default behavior if you just type gulp in this directory
gulp.task('default', ['html', 'css', 'js', 'lint', 'open', 'watch']);
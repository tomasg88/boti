//=======================================================================
// Requiring stuffs
//=======================================================================
var del = require('del');
var os = require('os');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var jsonMinify = require('gulp-jsonminify');
var less = require('gulp-less');
var releaseTasks = require('gulp-release-tasks');
var rename = require('gulp-rename');
var fontIcon = require('gulp-font-icon');
var uglify = require('gulp-uglify');
var webServer = require('gulp-webserver');
var seq = require('run-sequence');

//=======================================================================
// Globs
//=======================================================================
var GLOBS 				= {};
GLOBS.fonts 			= 'src/fonts/*';
GLOBS.icons 			= 'src/fonts/icons/*.svg';
GLOBS.libs 				= 'src/libs/**/*';
GLOBS.images			= 'src/img/*';
GLOBS.js					= 'src/js/*';
GLOBS.less 				= 'src/less/boti.less';

GLOBS.html 				= ['src/index.html', 'src/sample.html'];

//=======================================================================
// Report errors to console
//=======================================================================
gulp.on('error', function(e) {
	throw(e);
});

//=======================================================================
// Clean dest folder
//=======================================================================
gulp.task('clean', function(done) {
	del('dist/**').then(paths => {
		done();
	});
});

//=======================================================================
// Copy
//=======================================================================
gulp.task('copy:fonts', function() {
	return gulp.src(GLOBS.fonts)
	.pipe(gulp.dest(path.join('dist', 'fonts')));
});

gulp.task('copy:images', function() {
	return gulp.src(GLOBS.images)
	.pipe(gulp.dest(path.join('dist', 'img')));
});

gulp.task('copy:html', function() {
	return gulp.src(GLOBS.html)
	.pipe(gulp.dest('dist'));
});

gulp.task('copy', function(done) {
	seq('copy:images', 'copy:html', 'copy:fonts', done);
});

//=======================================================================
// Build less styles, then minify CSS and move to 'dist'
//=======================================================================
var CSS_TEMP_DIR = path.join(os.tmpdir(), 'boti', 'css');

gulp.task('css:build', function() {
	return gulp.src(GLOBS.less)
		.pipe(less())
		.pipe(gulp.dest(CSS_TEMP_DIR));
});

gulp.task('css:minify', function() {
	return gulp.src(path.join(CSS_TEMP_DIR, 'boti.css'))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.join('dist', 'css')));
});

gulp.task('css', function(done) {
	seq('css:build', 'css:minify', done);
});

//=======================================================================
// Generates icon font and css styleshhet
//=======================================================================
gulp.task('icons', function() {
	return gulp.src(GLOBS.icons)
		.pipe(fontIcon({
			fontName: 'icons-font',
			fontAlias: 'icon',
			normalize: true,
			fontHeight: 1001 }))
		.pipe(gulp.dest('dist/fonts/icons'));
});

//=======================================================================
// Uglify and minify JS
//=======================================================================
gulp.task('js:custom', function() {
	return gulp.src(GLOBS.js)
		.pipe(concat('boticario.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.join('dist', 'js')));
});

gulp.task('js:libs', function() {
	return gulp.src(GLOBS.libs)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.join('dist', 'js')));
});

gulp.task('js', function(done) {
	seq('js:custom', 'js:libs', done);
})

//=======================================================================
// Serve app
//=======================================================================
gulp.task('serve', function() {
	gulp.src('dist')
	.pipe(webServer({
		livereload: false,
		open: true
	}));
});

//=======================================================================
// Watchers
//=======================================================================
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['build']);
});

//=======================================================================
// Sequences
//=======================================================================
gulp.task('build', function(done) {
	seq('clean', 'copy', 'css', 'icons', 'js', done);
});

gulp.task('default', function(done) {
	seq('build', 'serve', 'watch', done);
});

//=======================================================================
// Release
//=======================================================================
releaseTasks(gulp);

var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var soynode = require('gulp-soynode');

gulp.task('connect', function() {
	connect.server({
		root: 'dist/public'
	});
});

gulp.task('images', function() {
	return gulp.src('src/public/images/**')
		.pipe(gulp.dest('dist/public/images'));
});

gulp.task('styles', function() {
	return gulp.src('src/public/styles/*.scss')
		.pipe(compass({
			css: 'dist/public/styles',
			sass: 'src/public/styles',
			image: 'dist/public/images'
		}))
		.pipe(gulp.dest('dist/public/styles'));
});

gulp.task('soy', function() {
	return gulp.src('src/**/*.soy')
		.pipe(soynode({
			renderSoyWeb: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('src/public/images/**', ['images']);
	gulp.watch('src/public/styles/*.scss', ['styles']);
	gulp.watch('src/**/*.soy', ['soy']);
});

gulp.task('default', ['soy', 'styles', 'connect', 'watch']);

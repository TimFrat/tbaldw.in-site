var gulp = require('gulp');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    var onError = function() {
        var args = [].slice.call(arguments);
        notify.onError({
            title: 'JS Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);
        this.emit('end');
    };

    return browserify('./' + 'js/app.js')
        .bundle({
            'debug': true
        })
        .on('error', onError)
        .pipe(source('main.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('compass', function() {
    gulp.src('sass/*.scss')
    .pipe(compass({
        'css': 'css',
        'sass': 'sass'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', ['compass', 'browserify'], function() {
    gulp.watch('sass/*.scss', ['compass']);
    gulp.watch(['js/**/*.js', 'js/**/*.hbs'], ['browserify']);
});

gulp.task('build', ['compass', 'browserify'], function() {
  gulp.src('js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

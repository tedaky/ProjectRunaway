// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var sassdoc = require('sassdoc');
var connect = require('gulp-connect-php');
var ts = require("gulp-typescript");

var paths = {
    sassinput: "app/scss/**/*.scss",
    sassdest: "app/css/scss",

    lessinput: "app/less/**/*.less",
    lessdest: "app/css/less",

    tsinput: "app/typescript/**/*.ts",
    tsdest: "app/javascript/typescript"
};

var tsproject = ts.createProject("tsconfig.json");
gulp.task('typescript', function(){
    return gulp.src(paths.tsinput)
        .pipe(ts(tsproject))
        .js.pipe(gulp.dest(paths.tsdest));
});

// dev connection
gulp.task('connect', function() {
    connect.server({ base: 'app', port: 8010, keepalive: true});
});

// Run build connection
gulp.task('connect-build', function() {
    connect.server({ base: 'dist', port: 8010, keepalive: true});
});

// dev browserSync
gulp.task('browserSync', ['connect'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});

// Run build connection
gulp.task('browserSync-build', ['connect-build'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 90909,
        open: true,
        notify: false
    });
});

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sassdoc', function () {
    return gulp
        .src(paths.sassinput)
        .pipe(sassdoc())
        .resume();
});

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

// less
gulp.task('less', function() {
    gulp.src(paths.lessinput)
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.lessdest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass
gulp.task('sass', function() {
    return gulp.src(paths.sassinput)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.sassdest))
        .pipe(sassdoc())
        .pipe(browserSync.reload({
            stream: true
        }))
        .resume();
});

gulp.task('useref', function() {
    return gulp.src('app/index.*')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// optimize images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

// distribute fonts
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// clean project
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
});

// clean distribution
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// clear cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

var sassdocOptions = {
    dest: './app/sassdoc'
};

gulp.task('sassdoc', function () {
    return gulp
        .src(paths.sassinput)
        .pipe(sassdoc(sassdocOptions))
        .resume();
});

// watch file changes
gulp.task('watch', ['browserSync', 'sass', 'less', 'typescript'], function () {
    gulp.watch(paths.sassinput, ['sass']);
    gulp.watch(paths.lessinput, ['less']);
    gulp.watch(paths.tsinput, ['typescript']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.php', browserSync.reload);
    gulp.watch('app/javascript/**/*.js', browserSync.reload);
});

// default gulp | starts dev web server
gulp.task('default', function (callback) {
    runSequence(['sass', 'less', 'typescript', 'browserSync', 'watch'], callback);
});

// build distribution
gulp.task('build', function (callback) {
    runSequence('clean:dist', 'sass', 'less', 'typescript', ['useref', 'images', 'fonts'], callback);
});

// Run build connection
gulp.task('run-build', ['browserSync-build']);

gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(paths.sassinput)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(sassdocOptions.dest));
});
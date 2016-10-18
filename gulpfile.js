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
var uncss = require('gulp-uncss');
var haml = require('gulp-haml');

var paths = {
    cssdest: "app/public/css",

    sassinput: "app/source/scss/**/*.scss",
    sassdest: "app/public/css/scss",

    lessinput: "app/source/less/**/*.less",
    lessdest: "app/public/css/less",

    tsinput: "app/source/typescript/**/*.ts",
    tsdest: "app/public/javascript/typescript",
    
    hamlinput: "app/source/haml/**/*.haml",
    hamldest: "app/public"
};

gulp.task('haml', function () {
  gulp.src(paths.hamlinput)
    .pipe(haml({ext: '.php'}))
    //.pipe(gulp.dest(paths.hamldest));
    .pipe(gulp.dest("app/php"));
});

var tsproject = ts.createProject("tsconfig.json");
gulp.task('typescript', function(){
    return gulp.src(paths.tsinput)
        .pipe(ts(tsproject))
        .js.pipe(gulp.dest(paths.tsdest));
});

// dev connection
gulp.task('connect', function() {
    connect.server({ base: 'app/public', port: 8010, keepalive: true});
});

// Run build connection
gulp.task('connect-build', function() {
    connect.server({ base: 'dist/public', port: 8010, keepalive: true});
});

// dev browserSync
gulp.task('browserSync', ['connect'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: false,
        notify: false
    });
});

// Run build connection
gulp.task('browserSync-build', ['connect-build'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: false,
        notify: false
    });
});

// libs
gulp.task('libs', function() {
    return gulp.src('app/Libs/**/*.php')
        .pipe(gulp.dest('dist/Libs'));
});

// controllers
gulp.task('controllers', function() {
    return gulp.src('app/Controllers/**/*.php')
        .pipe(gulp.dest('dist/Controllers'));
});

// models
gulp.task('models', function() {
    return gulp.src('app/Models/**/*.php')
        .pipe(gulp.dest('dist/Models'));
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
        .pipe(autoprefixer())
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
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sassdest))
        .pipe(sassdoc())
        .pipe(browserSync.reload({
            stream: true
        }))
        .resume();
});

gulp.task('useref', function() {
    return gulp.src(['app/public/**/*.php', 'app/public/.htaccess', 'app/public/web.config'])
        .pipe(useref({ searchPath: 'app/public/' }))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist/public'));
});

// optimize images
gulp.task('images', function() {
    return gulp.src('app/public/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/public/images'));
});

// distribute fonts
gulp.task('fonts', function() {
    return gulp.src('app/public/fonts/**/*')
        .pipe(gulp.dest('dist/public/fonts'));
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
    dest: 'app/sassdoc'
};

gulp.task('sassdoc', function () {
    return gulp
        .src(paths.sassinput)
        .pipe(sassdoc(sassdocOptions.dest))
        .resume();
});

// doesn't work on server languages'
gulp.task('uncss', function () {
    return gulp.src('dist/public/css/**/*.css')
        .pipe(uncss({
            html: ['dist/public/**/*.php'],
            ignore: []
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/public/css'));
});

// watch file changes
gulp.task('watch', ['browserSync', 'haml', 'sass', 'less', 'typescript'], function () {
    gulp.watch(paths.sassinput, ['sass']);
    gulp.watch(paths.lessinput, ['less']);
    gulp.watch(paths.tsinput, ['typescript']);
    gulp.watch('app/public/**/*.html', browserSync.reload);
    gulp.watch('app/public/**/*.php', browserSync.reload);
    gulp.watch('app/public/javascript/**/*.js', browserSync.reload);
});

// default gulp | starts dev web server
gulp.task('default', function (callback) {
    runSequence(['haml', 'sass', 'less', 'typescript', 'browserSync', 'watch'], callback);
});

// build distribution
gulp.task('build', function (callback) {
    runSequence('clean:dist', 'haml', 'sass', 'less', 'typescript', ['useref', 'images', 'fonts'], 'libs', 'controllers', 'models', 'uncss', callback);
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
'use strict';

var fs = require('fs-extra');
var { src, dest, series, parallel, watch } = require('gulp');
var compileSass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

compileSass.compiler = require('node-sass');


function assets(cb) {
    // copies assets from src/public to /public
    fs.copy('./src/public/', './build/public', function(err) {
        if (err) console.error(err);
        cb();
    });

    fs.copy('./src/index.html', './build/index.html', function(err) {
        if (err) console.error(err);
        cb();
    });
}

function sass() {
    return src('src/scss/app.scss')
        .pipe(compileSass())
        .pipe(minifyCSS())
        .pipe(dest('build/public/css'))
        .pipe(browserSync.stream());
}

function js() {
    return browserify({
        basedir: './src/js/',
        debug: true,
        entries: ['app.js'],
        cache: {},
        packageCache: {}
    })
        .transform('babelify', {
            presets: ['@babel/preset-env'],
            plugins: [
                '@babel/plugin-proposal-private-methods',
                '@babel/plugin-proposal-class-properties',
            ],
            extensions: ['.js']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(uglify())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(dest('build/public/js/'))
        .pipe(browserSync.stream());
}

function nodemonServer(cb) {
    var started = false;
    return nodemon({
        script: './server.js',
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() {
        // avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
}

function syncBrowser(cb) {
    browserSync.init({
        proxy: 'http://localhost:8585',
        port: 7000,
        // reloadDelay: 1000
    }, cb);
}

function watchFiles(cb) {
    nodemonServer(syncBrowser);
    // Watch for file changes in 'src' directory
    watch(['src/scss/**/*.scss'], sass);
    watch(['src/js/**/*.js'], js);

    // TODO: Add auto copy and reload of assets when new assets added
    // watch(['src/*.html']).on('change', series(assets, browserSync.reload));
    // watch(['src/public']).on('change', series(assets, browserSync.reload));
    cb();
}



exports.assets = assets;
exports.watch = series(parallel(assets, sass, js), watchFiles);
exports.default = parallel(assets, sass, js);
'use strict';

var config = require('../../config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    stripJs = require('gulp-strip-comments');     

module.exports = function() {

    gulp.task('scripts:compile', function(done) {

        var srcPath = config.srcPath + '/server',
            srcFiles = srcPath + '/**/*.js',
            destPath = config.destPath + '/server';

         // cleanup
        del.sync([destPath + '/**/*[.js,.js.map]']);

        gulp.src(srcFiles)
            .pipe(plumber(function(error) {
                gutil.log(error.message);
                this.emit('end');
            }))
            //.pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(babel({ presets: ['latest'] }))
            //.pipe(uglify({ mangle: false }))
            //.pipe(concat(fileName + '.js'))
            //.pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);       

    });

    gulp.task('scripts:build', function(done) {

        var srcPath = config.srcPath + '/public',
            srcFiles = srcPath + '/**/*.js',
            destPath = config.destPath + '/public/js';

        // cleanup
        del.sync([destPath +  '/' + config.clientFileName + '*[.js, .js.map]']);

        gulp.src(srcFiles)
            .pipe(plumber(function(error) {
                gutil.log(error.message);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(babel({ presets: ['latest'] }))
            .pipe(uglify({ mangle: false }))
            .pipe(concat(config.clientFileName + '.js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(stripJs())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });

    // gulp.task('scripts:watch', function() {
    //     gulp.watch(srcPath + '/**/*.js', ['scripts:build', 'server:reload']);
    // });
};
'use strict';

var config = require('../../config.js'),
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

module.exports = function() {
    gulp.task('nodemon', function() {
        var stream = nodemon({
            script: config.destPath + '/server/index.js'//, 
            // ext: 'html js', 
            // ignore: ['ignored.js'], 
            // tasks: ['lint'] 
        });

        stream
            .on('restart', function() {
                console.log('Server restarted.\n');
            })
            .on('crash', function() {
                console.error('Application has crashed!\n');
                stream.emit('restart', 10);  // restart the server in 10 seconds
            });
    });
};
'use strict';

let fs = require('fs'),
    path = require('path'),
    pkg = require('./package');

module.exports =  {

    name: pkg.name,
    version: pkg.version,

    gulpTaskPath: './gulp/tasks',

    server: {
        address: 'localhost',
        port: '3000',
        root: path.join(__dirname, 'dist/public'),
        //sshKey: fs.readFileSync(__dirname + '/ssl/quizr.key'),
        //sshCert: fs.readFileSync(__dirname + '/ssl/quizr.crt')    
        secret: 'ilovescotchyscotch'
    },

    clientFileName: 'quizr',
    
    srcPath: './src',
    destPath: './dist',

    paths: {
        css: '/css',
        js: '/js'
    },

    vendor: {
        jquery: [
            './node_modules/jquery/dist/jquery.min.js'
        ],
        bootstrap: [
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            './node_modules/responsive-toolkit/dist/bootstrap-toolkit.min.js'
        ]
        // canvg: [
        //     "./node_modules/canvg-fixed/rbgColor.js",
        //     "./node_modules/canvg-fixed/StackBlur.js",
        //     "./node_modules/canvg-fixed/canvg.js"
        // ]
    }

};

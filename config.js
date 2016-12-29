'use strict';

let fs = require('fs'),
    path = require('path'),
    pkg = require('./package');

module.exports =  {

    name: pkg.name + ' ' + pkg.version,

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
        // canvg: [
        //     "./node_modules/canvg-fixed/rbgColor.js",
        //     "./node_modules/canvg-fixed/StackBlur.js",
        //     "./node_modules/canvg-fixed/canvg.js"
        // ]
    }

};

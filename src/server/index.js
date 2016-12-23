'use strict';

let config = require('../../config'),
    express = require('express'),
    http = require('http'),
    https = require('https'),
    nunjucks = require('nunjucks'),

    contentful = require('contentful'),

    quizes = require('./modules/routers/quizes');

let app = express(),

    client = contentful.createClient({
        space: '3ldr1bchss3v',
        accessToken: '88c554ef3373b7cbbf84c018dfda35d47637bbc1a63f170cfedbd38f2d77bc59'
    });


// set static server root
//app.use(express.static(config.server.root));

nunjucks.configure(config.server.root, {
    autoescape: true,
    express: app
});

// routing
app.get('/', (req, res) => {

    // client.getEntry('6nxuEr58D6MsS48aGcGw8e').then((entry) => {
    //     // logs the entry metadata
    //    console.log(entry.sys);

    //     // logs the field with ID title
    //     console.log(entry.contentType);
    // });

    // client.getContentType('quiz').then((contentType) => {
    //     // log the title for all the entries that have it
    //     console.log(contentType);
    // });

    // console.log(res);

    res.render('index.html', { title: 'Quizrrr 0.1' });

});

app.use('/quizes', quizes);

let server = http.createServer(app).listen(config.server.port, () => {
        console.log(`Server stated at http://${config.server.address}:${config.server.port}.`);
    });
// let server = https.createServer({ key: config.server.sshKey, cert: config.server.sshCert }, app).listen(config.server.port, () => {
//     console.log(`Server stated at https://${config.server.address}:${config.server.port}.`);
// });
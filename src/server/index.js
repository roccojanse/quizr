'use strict';

let config = require('../../config'),
    express = require('express'),
    http = require('http'),
    https = require('https'),
    nunjucks = require('nunjucks'),
    contentful = require('contentful'),
    
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server),

    client = contentful.createClient({
        space: '3ldr1bchss3v',
        accessToken: '88c554ef3373b7cbbf84c018dfda35d47637bbc1a63f170cfedbd38f2d77bc59'
    }),

    quizes = require('./modules/routers/quizes');

// nunjucks config
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

    res.render('index.html', {
        config: config,
        meta: {
            title: config.name
        },
        title: config.name 
    });

});

// routes
app.use('/quizes', quizes);

io.on('connection', (socket) => {
    console.log('CONNECTED!');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// create server(s)
server.listen(config.server.port, () => {
    console.log(`Server stated at http://${config.server.address}:${config.server.port}.`);
});
// let server = https.createServer({ key: config.server.sshKey, cert: config.server.sshCert }, app).listen(config.server.port, () => {
//     console.log(`Server stated at https://${config.server.address}:${config.server.port}.`);
// });


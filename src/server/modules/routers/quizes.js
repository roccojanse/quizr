'use strict';

let config = require('../../../../config'),
    express = require('express'),
    router = express.Router(),

    contentful = require('contentful'),
    client = contentful.createClient({
        space: '3ldr1bchss3v',
        accessToken: '88c554ef3373b7cbbf84c018dfda35d47637bbc1a63f170cfedbd38f2d77bc59'
    });

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

// define the quizes overview
router.get('/', (req, res) => {

    // get all current quizes
    let quizes;

    client.getEntries({
       'content_type': 'quiz'
    }).then((entries) => {
        // logs the entry metadata
        quizes = entries;
        res.render('quizes/overview.html', { 
            config: config,
            meta: {
                title: `${config.name} v${config.version}`
            },
            title: 'Current created Quizes',
            quizes: quizes 
        });
    });
});

// define the detailview
router.get('/:id', (req, res) => {


    client.getEntry(req.params.id).then((entry) => {
        let quiz = entry;
        let questions = [];
        quiz.fields.questions.forEach((question, i) => {
            client.getEntry(question.sys.id).then((entry) => {
                questions[i] = entry;
                console.log(entry);
            });
        });

        console.log(questions);

        res.render('quizes/detail.html', { 
            config: config,
            meta: {
                title: `${config.name} v${config.version}`
            },
            quiz: quiz,
            questions: questions
        });
    });

});

module.exports = router;
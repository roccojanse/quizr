'use strict';

let express = require('express');

let port = 3000,
    app = express();

app.get('/', (req, res) => {
    res.send('hello.');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
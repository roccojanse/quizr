/* global $, io */
'use strict';

    let server = {
        address: 'localhost',
        port: 3000
    };

    let socket = io.connect(`http://${server.address}:${server.port}`);



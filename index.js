'use strict';
require('dotenv').config();
const path = require('path') //needed that sadly
require('dotenv').config({path: path.resolve(__dirname, '.env')})
const server = require('./src/server');

const {db} = require('./src/auth/models/');
// make sure our tables are created, start up the HTTP server.
// db.sync()
//     .then(() => {
//         app.listen(process.env.PORT, () => console.log('Boss, server is up on',process.env.PORT));
//     }).catch(e => {
//     console.error('Could not start server', e.message);
// });

db.sync()
    .then(() => {
        server.start(process.env.PORT);
    })
    .catch(e => {
        console.error('Could not start server', e.message);
    })

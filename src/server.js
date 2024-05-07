'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const userRoutes = require('./auth/router.js');
const port = process.env.PORT;


const notFoundHandler = require('./handlers/500');
const errorHandler = require('./handlers/500');


app.use(cors());
app.use(express.json());

app.use(userRoutes);


function start(port) {
    app.listen(port, () => {
        console.log(`S e r v e r  is UP on ${port}`);
    });
}

module.exports = {app, start};
'use strict';

require('dotenv').config();

const port = process.env.PORT;
const express = require('express');
const cors = require('cors');

const app = express();

const userRoutes = require('./auth/router.js');

const notFoundHandler = require('./handlers/500');
const errorHandler = require('./handlers/500');

app.use(cors());
app.use(express.json());
app.use(userRoutes);

function start(port) {
    app.listen(port, () => {
        console.log(`server  is UP on ${port}`);
    });
}

module.exports = {app, start};
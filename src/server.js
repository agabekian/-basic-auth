require('dotenv').config();

const path = require('path') // needed that
require('dotenv').config({path: path.resolve(__dirname, '.env')})

const sequelize = new Sequelize(process.env.DATABASE_URL, testOrProduction ? { logging: false } : {});


const express = require('express');
const app = express();

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT,
            () => console.log(`server is up on port, ${process.env.PORT}, man...`));
    })
    .catch(e => {
        console.error('Could not start the damn server, here is why: ', e.message);
    });
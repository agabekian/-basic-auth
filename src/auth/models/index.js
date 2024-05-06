const DATABASE_URL = process.env.DATABASE_URL;

const {Sequelize, DataTypes} = require('sequelize');

const users = require('./users.js');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres',
        host: 'localhost',
    });

module.exports = {
    db: sequelize,                      // -->./index.js
    People: users(
        sequelize, DataTypes
    )
}
const DATABASE_URL = process.env.DATABASE_URL;

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres',
        host: 'localhost',
    });

const usersModel = require('./users.js');

module.exports = {
    db: sequelize,                      // -->./index.js
    Users: usersModel(
        sequelize, DataTypes
    ),
};
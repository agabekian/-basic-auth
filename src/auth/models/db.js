const DATABASE_URL = process.env.DATABASE_URL;

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    DATABASE_URL, {
        dialect: 'postgres',
        host: 'localhost',
    });

const usersSchema = require('./users.js');

module.exports = {
    db: sequelize,                      // -->./db.js
    Users: usersSchema(
        sequelize, DataTypes
    ),
};
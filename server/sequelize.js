'use strict';

const Sequelize = require('sequelize');
const {DATABASE_URL} = require('./config');

let sequelize = null;

function dbConnect(url = DATABASE_URL) {
  sequelize = new Sequelize(url);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = dbConnect;
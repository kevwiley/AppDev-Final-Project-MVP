const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    dialect: 'sqlite',
    storage: `database/${process.env.DB_NAME}`,
    logging: false
});

module.exports = db;
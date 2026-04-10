//builds needs a name and id, but from there users can choose what else they want to add
const { DataTypes } = require('sequelize');
const db = require('../setup');

const Build = db.define('Build', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Build;
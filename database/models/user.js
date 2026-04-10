//user model will have an id, usernamen, email, and password. Will get user role as default.
const { DataTypes } = require('sequelize');
const db = require('../setup');

const User = db.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
});

module.exports = User;
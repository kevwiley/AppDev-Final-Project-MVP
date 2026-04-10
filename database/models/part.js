//part will have id, name, part category and price, they can be updated.
const { DataTypes } = require('sequelize');
const db = require('../setup');

const Part = db.define('Part', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { 
        type: DataTypes.ENUM('CPU','GPU','Motherboard','RAM','Storage'),
        allowNull: false
    },
    price: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Part;
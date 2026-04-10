const db = require('../setup');
const User = require('./user');
const Part = require('./part');
const Build = require('./build');

//Relationships
User.hasMany(Build);
Build.belongsTo(User);

//Parts relationships, parts are set to null if deleted since error will occur if build uses a non existant one
Build.belongsTo(Part, { as: 'cpu', foreignKey: { name: 'cpuId', allowNull: true }, onDelete: 'SET NULL' });
Build.belongsTo(Part, { as: 'gpu', foreignKey: { name: 'gpuId', allowNull: true }, onDelete: 'SET NULL' });
Build.belongsTo(Part, { as: 'motherboard', foreignKey: { name: 'motherboardId', allowNull: true }, onDelete: 'SET NULL' });
Build.belongsTo(Part, { as: 'ram', foreignKey: { name: 'ramId', allowNull: true }, onDelete: 'SET NULL' });
Build.belongsTo(Part, { as: 'storage', foreignKey: { name: 'storageId', allowNull: true }, onDelete: 'SET NULL' });

//Init DB
async function initDB() {
    try {
        await db.authenticate();
        await db.sync({ force: false });
        console.log('DB Ready');
    } catch (err) {
        console.error('DB Error:', err);
    }
}

module.exports = {
    db,
    User,
    Part,
    Build,
    initDB
};
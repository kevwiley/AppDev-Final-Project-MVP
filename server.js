const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./database/models');

const authRoutes = require('./routes/auth');
const partRoutes = require('./routes/parts');
const buildRoutes = require('./routes/builds');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors());

initDB();

//routes
app.use('/api', authRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/builds', buildRoutes);
app.use('/api/users', userRoutes);

//ensures testing will work properly
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
}

module.exports = app;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const router = express.Router();

//new users can be registered with the post request. new users need username, email and password, and are assigned "user" role
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body; //role removed from destructure

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields required' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash,
            role: 'user' //hardcoded, never taken from request body
        });

        res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username, email: user.email } });

    } catch {
        res.status(500).json({ error: 'Registration failed' });
    }
});

//login gives token based on role. The token is returned here for testing purposes
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } //fallback so login never 500s on missing env var
        );

        res.json({ token });

    } catch {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
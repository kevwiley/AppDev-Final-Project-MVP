//authentication middleware base on whether user is "user" or "admin" role
//new users are automatically "user", and can post/update
//admins can see all user accounts, and delete anything
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token' });

    try {
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

function requireUser(req, res, next) {
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'User access required' });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

module.exports = { requireAuth, requireUser, requireAdmin };
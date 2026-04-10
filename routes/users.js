const express = require('express');
const { User } = require('../database/models');
const { requireAuth, requireUser, requireAdmin } = require('../middleware/auth');

const router = express.Router();

//gets all users, admin only
router.get('/', requireAuth, requireAdmin, async (req, res) => {
    const users = await User.findAll({
        attributes: ['id','username','email','role']
    });
    res.json(users);
});

//updates username, users cann only update their own account
router.put('/:id', requireAuth, requireUser, async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username required' });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //only allow user to update their own account (or admin)
        if (user.id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await user.update({ username });

        res.json({
            message: 'Username updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Update username error:', err);
        res.status(500).json({ error: 'Failed to update username' });
    }
});

//user post request is in auth

//deletes a user, admin required
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });

    await user.destroy();
    res.json({ message: 'Deleted' });
});

module.exports = router;
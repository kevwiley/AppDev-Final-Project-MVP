const express = require('express');
const { Build } = require('../database/models');
const { requireAuth, requireUser, requireAdmin } = require('../middleware/auth');

const router = express.Router();

//gets all builds
router.get('/', async (req, res) => {
    const builds = await Build.findAll({
        include: ['cpu','gpu','motherboard','ram','storage']
    });
    res.json(builds);
});

//Get build by ID
router.get('/:id', async (req, res) => {
    try {
        const build = await Build.findByPk(req.params.id, {
            include: ['cpu','gpu','motherboard','ram','storage']
        });

        if (!build) {
            return res.status(404).json({ error: 'Build not found' });
        }

        res.json(build);

    } catch (err) {
        console.error('Get build error:', err);
        res.status(500).json({ error: 'Failed to get build' });
    }
});

//creates build, using inputted req.body and user id
router.post('/', requireAuth, requireUser, async (req, res) => {
    const build = await Build.create({
        ...req.body,
        UserId: req.user.id
    });
    res.status(201).json(build);
});

//allows user or admins to update a build. Only owner users can update a build they own
router.put('/:id', requireAuth, requireUser, async (req, res) => {
    const build = await Build.findByPk(req.params.id);
    if (!build) return res.status(404).json({ error: 'Not found' });

    if (build.UserId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    await build.update(req.body);
    res.json(build);
});

//Admins can delete user
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
    const build = await Build.findByPk(req.params.id);
    if (!build) return res.status(404).json({ error: 'Not found' });

    await build.destroy();
    res.json({ message: 'Deleted' });
});

module.exports = router;
const express = require('express');
const { Part } = require('../database/models');
const { requireAuth, requireUser, requireAdmin } = require('../middleware/auth');

const router = express.Router();

//gets all parts
router.get('/', async (req, res) => {
    const parts = await Part.findAll();
    res.json(parts);
});

//gets specific parts base on id
router.get('/:id', async (req, res) => {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ error: 'Not found' });
    res.json(part);
});

//adds new part. Can only be done by user or admin role
router.post('/', requireAuth, requireUser, async (req, res) => {
    const part = await Part.create(req.body);
    res.status(201).json(part);
});

//allows part to be updated
router.put('/:id', requireAuth, requireUser, async (req, res) => {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ error: 'Not found' });

    await part.update(req.body);
    res.json(part);
});

//allows part to be deleted by admin role
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ error: 'Not found' });

    await part.destroy();
    res.json({ message: 'Deleted' });
});

module.exports = router;
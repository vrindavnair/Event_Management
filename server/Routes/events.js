const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const auth = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new event
router.post('/', auth, async (req, res) => {
    const { title, organizer, category, date, description } = req.body;
    const event = new Event({
        title,
        organizer,
        category,
        date,
        description
    });

    try {
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an event
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        Object.assign(event, req.body);
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        await event.remove();
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search events by title or organizer
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const events = await Event.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { organizer: new RegExp(query, 'i') }
            ]
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Filter events by category or date
router.get('/filter', async (req, res) => {
    const { category, date } = req.query;
    let filters = {};

    if (category) filters.category = category;
    if (date) filters.date = { $gte: new Date(date) };

    try {
        const events = await Event.find(filters);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;




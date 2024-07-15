const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);



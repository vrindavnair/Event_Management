

const Event = require("../models/event");

const addNewEvent = async (req, res) => {
  console.log("Received request to add new event:", req.body);
  
  const event = new Event({
    title: req.body.title,
    organizer: req.body.organizer,
    category: req.body.category,
    date: req.body.date,
    description: req.body.description,
  });
  
  try {
    const newEvent = await event.save();
    console.log("New event saved:", newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error saving event:", err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addNewEvent };

  
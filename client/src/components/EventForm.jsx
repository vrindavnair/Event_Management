import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ fetchEvents }) => {
    const [title, setTitle] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = { title, organizer, category, date, description };
        await axios.post('http://localhost:5000/api/events', event, {
            headers: { Authorization: localStorage.getItem('token') }
        });
        fetchEvents();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={organizer} onChange={e => setOrganizer(e.target.value)} placeholder="Organizer" required />
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;


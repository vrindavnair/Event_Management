import React from 'react';
import axios from 'axios';

const EventItem = ({ event, fetchEvents }) => {
    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/events/${event._id}`, {
            headers: { Authorization: localStorage.getItem('token') }
        });
        fetchEvents();
    };

    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.organizer}</p>
            <p>{event.category}</p>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <button onClick={handleDelete}>Delete</button>
            <button>Update</button>
        </div>
    );
};

export default EventItem;

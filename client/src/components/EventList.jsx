import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventItem from './EventItem';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
    };

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:5000/api/events/search?query=${searchQuery}`);
        setEvents(response.data);
    };

    const handleFilter = async () => {
        const response = await axios.get(`http://localhost:5000/api/events/filter?category=${category}&date=${date}`);
        setEvents(response.data);
    };

    return (
        <div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search events..." />
            <button onClick={handleSearch}>Search</button>
            <br />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
            </select>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button onClick={handleFilter}>Filter</button>
            <br />
            {events.map(event => (
                <EventItem key={event._id} event={event} />
            ))}
        </div>
    );
};

export default EventList;



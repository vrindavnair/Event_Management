import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const response = await axios.post('http://localhost:5000/api/users/register', { username, password });
        console.log(response.data);
    };

    const handleLogin = async () => {
        const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
        localStorage.setItem('token', response.data.token);
    };

    return (
        <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Auth;


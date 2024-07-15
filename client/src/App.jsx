import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Auth from './components/Auth';

const App = () => {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/events' element={<EventList/>}/>
        <Route path='/add-event' element={<EventForm/>}/>
        <Route path='/auth' element={<Auth/>}/>


      </Routes>

      </BrowserRouter>
       
    );
};

export default App;

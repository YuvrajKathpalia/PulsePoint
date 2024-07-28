import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registerr from './pages/Registerr';

import Navbar from './components/Navbar';


import Profile from './pages/profile';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registerr />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default App;



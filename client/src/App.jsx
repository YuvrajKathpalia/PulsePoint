import React from 'react';
import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registerr from './pages/Registerr';
import ArticlePage from './pages/ArticlePage';
import Profile from './pages/profile';

const App = () => (
  <Router>
    <Navbar />
    <main className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registerr />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        
      </Routes>
    </main>
  </Router>
);


export default App;


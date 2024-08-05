
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Registerr';
import Profile from './pages/profile';
import Navbar from './components/Navbar';
import Categories from './pages/Categories';
import MoreArticles from './pages/MoreArticles';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news/:category" element={<Categories />} />
        <Route path="/more-articles/:category" element={<MoreArticles />} />

      </Routes>
    </Router>
  );
}

export default App;






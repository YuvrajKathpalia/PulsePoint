import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-lg">News App</h1>
      <div>
        <Link to="/" className="text-white mr-4">Home</Link>
        <Link to="/login" className="text-white mr-4">Login</Link>
        <Link to="/register" className="text-white mr-4">Register</Link>
        <Link to="/profile" className="text-white">Profile</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;



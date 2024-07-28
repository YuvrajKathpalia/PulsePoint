import React from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/favii.png" alt="PulsePoint Logo" className="logo h-10 mr-2" /> {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">PulsePoint</Link> {/* Brand Name */}
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/register" className="text-white hover:bg-gray-700 p-2 rounded">Register</Link>
        <Link to="/login" className="text-white hover:bg-gray-700 p-2 rounded">Login</Link>
        <Link to="/profile" className="text-white hover:bg-gray-700 p-2 rounded">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;









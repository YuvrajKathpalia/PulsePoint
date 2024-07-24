import React from 'react';

const Navbar = () => (
  <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-lg">News App</h1>
      <div>
        <a href="#" className="text-white mr-4">Home</a>
        <a href="#" className="text-white mr-4">Login</a>
        <a href="#" className="text-white">Register</a>
      </div>
    </div>
  </nav>
);

export default Navbar;


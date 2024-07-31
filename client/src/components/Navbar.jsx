import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css'; 


import accountimg from '../assets/AccountImg.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    const token = localStorage.getItem('token'); 

    if (token) {
      navigate('/profile'); 
    } else {
      alert('Please sign in first'); 
    }
  };

  return (
    <div>
     
      <div className="navbar1">
        <img src="/favii.png" alt="PulsePoint Logo" className="logo" />
        <div className="heading-container">
          <h1 className="heading">PulsePoint</h1>
          <p className="slogan">YOUR PERSONAL NEWS BEAT</p>
        </div>
      </div>
      
      
      <div className="navbar2">
        <div className="nav-links">
          <Link to="/news/business">Business</Link>
          <Link to="/news/entertainment">Entertainment</Link>
          <Link to="/news/general">General</Link>
          <Link to="/news/health">Health</Link>
          <Link to="/news/science">Science</Link>
          <Link to="/news/sports">Sports</Link>
          <Link to="/news/technology">Technology</Link>
        </div>
        
        <div className="button-container">
          <Link to="/subscribe" className="button">Subscribe</Link>
          <Link to="/signin" className="button">Sign In</Link>
        </div>
      </div>

      
      <button onClick={handleMyAccountClick} className="icon-button">
        <img src={accountimg} alt="Account" className="account-icon" />
        <span className="icon-text">My Account</span>
      </button>
    </div>
  );
};

export default Navbar;









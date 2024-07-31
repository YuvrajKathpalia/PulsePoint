
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/signin.css'; 

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); 

  const navigate = useNavigate(); 


  // Clear formdata when component is mounted
  useEffect(() => {
    
    console.log('SignIn component mounted');
    setFormData({
      email: '',
      password: '',
    });
    setError(''); // Clear any existing error message
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }

      localStorage.setItem('token', data.token); // Store the token in local storage
      console.log('Login successful:', data);
      navigate('/profile');
    } 
    
    catch (error) {
      setError(error.message); 
      setFormData({ email: '', password: '' }); 
      console.error('Error during login:', error);
    }
  };

  const handleClose = () => {
    navigate('/'); // Navigate to home page on close
  };

  return (
    <div className="card-overlay">
      <div className="card-content">
        <div className="card-left">
          <h2 className="font-bold text-blue-500 text-3xl mb-6">Login to enjoy a world of benefits</h2>
          <ul>
            <li>Enjoy a more personalized experience</li>
            <li>Get real-time updates on breaking news and alerts</li>
            <li>Access premium content and features</li>
          </ul>
        </div>
        <div className="divider"></div> {/* Vertical line between sections */}
        <div className="card-right">
          <button className="card-close-button" onClick={handleClose}>X</button>
          <form onSubmit={handleSubmit}>
            <div className="card-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="card-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="card-submit-button">Sign In</button>
            {error && <p className="error-message">{error}</p>} 
          </form>
          <div className="card-link-container">
            <p>New customer? <a href="/register">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


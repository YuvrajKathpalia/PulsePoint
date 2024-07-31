import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Failed to fetch user data');
        }

        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">User Profile</h1>
      {user ? (
        <div className="profile-info">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;







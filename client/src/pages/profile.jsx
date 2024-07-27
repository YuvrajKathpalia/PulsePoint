import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {


    const fetchProfile = async () => {

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found, please login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data);
      } 
      
      catch (err) {
        console.error(err);
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);


  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Profile</h2>

      {error && <p className="text-red-500">{error}</p>}
      
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : 
      (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

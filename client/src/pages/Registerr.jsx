import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Registerr = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {

        setMessage('Registration successful!');
        setError('');

//form bhi clear krdia.. 
        setUsername('');
        setEmail('');
        setPassword('');
//and navigate to login page on sucessful registration
        navigate('/login');
      } 
      else {
        setError(data.msg);
      }
    } 
    
    catch (err) {
      console.error(err);
      setError('Server error');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold ml-5">Register</h2>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <form className="mt-4 ml-5" onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoComplete="off" 
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoComplete="off" 
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registerr;


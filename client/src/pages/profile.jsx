import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 


const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    country: '',
    city: ''
  });
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');  //default profile hi chie
  const [editMode, setEditMode] = useState(false);
  const [initialUser, setInitialUser] = useState({}); 

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
        setInitialUser(data); // Save the initial user data for comparison

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
      finally {
        setLoading(false); 
      }
    };

    

    const fetchSavedArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles/saved-articles', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });



        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.msg || 'Failed to fetch saved articles'); 
        }


        if (Array.isArray(data)) {
          setSavedArticles(data);
        } else {
          console.error('Data fetched is not an array:', data);
          setError('Failed to fetch saved articles.');
        }
      } catch (error) {
        console.error('Error fetching saved articles:', error);
        setError('Failed to fetch saved articles.');
      }
    };

    if (token) {
      fetchUserData();
      fetchSavedArticles();
    }
  }, [token]);
 
  useEffect(() => {
    console.log('Saved Articles Data:', savedArticles); 
  }, [savedArticles]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/update-profile', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
  
      
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.msg || 'Failed to update profile');
        }
  
        setUser(data); // Update state with new user data
        setEditMode(false); // Exit edit mode
  
        setInitialUser(data); // Save the initial user data for comparison
  
        alert('Profile updated successfully');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleUnsaveArticle = async (title) => {

    if (!title) {
      console.error('title is undefined ,cant unsave article.');
      return;
    }

    
    try {
      console.log("this is the article title" ,title)
      const response = await fetch('http://localhost:5000/api/articles/unsave-article', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title }), //title bheja ha backend
      });

      if (response.ok) {
        const updatedArticles = savedArticles.filter(article => article.title !== title); 
        console.log('Before Update:', savedArticles);
        console.log('After Update:', updatedArticles);
        setSavedArticles(updatedArticles);
        alert('Article unsaved successfully');
      } 
      else {
        throw new Error('Failed to unsave article');
      }
    } catch (error) {
      console.error('Error unsaving article:', error);
      alert('Failed to unsave article');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  const handleSectionChange = (section) => {  //state mangemnt during section change
    setActiveSection(section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-80 px-6 py-4 mt-6 mx-20">
        <div className="text-center mb-6">
          <img src="/profile1.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-2" />
          <h2 className="text-xl font-semibold">{user.username}</h2>
        </div>
        <nav>
          <ul className="space-y-2">
          <li >
              <button onClick={() => handleSectionChange('profile')} className="font-semibold hover:bg-blue-500 text-3xl mb-1 pl-12 pr-11 py-3">My Profile</button>
            </li>
            <li>
              <button onClick={() => handleSectionChange('subscriptions')} className="font-semibold hover:bg-blue-500 text-3xl mb-1 pr-10 py-3">Manage Subscriptions</button>
            </li>
            <li>
              <button onClick={() => handleSectionChange('saved-articles')} className="font-semibold hover:bg-blue-500 text-3xl mb-1 pr-4 py-3 pl-5">Saved Articles</button>
            </li>
            <li>
              <button onClick={() => handleSectionChange('change-password')} className="font-semibold hover:bg-blue-500 text-3xl mb-1 pr-4 py-5 py-3">Change Password</button>
              </li>
            <li>
              <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Profile Section */}
        {activeSection === 'profile' && (
    <section id="profile" className="p-4 rounded-lg mb-6">

          <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit}  className="space-y-6 p-6 bg-white shadow-md rounded-md grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-2xl font-medium  text-gray-700  mt-5">Username</label>
                <input 
                  name="username"
                  type="text"
                  id="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500  lg:text-lg"
                  disabled={!editMode} // Disable input when not in edit modeee
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-2xl font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  disabled={!editMode}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-2xl font-medium text-gray-700 ">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  id="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="mt-1 block w-full border-gray-300 text-lg h-8"
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-2xl font-medium text-gray-700">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  id="dob"
                  value={user.dob}
                  onChange={handleInputChange}
                  placeholder="Enter date of birth"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg h-8"
                />
              </div>
              <div>
                <fieldset>
                  <legend className="block text-2xl font-medium text-gray-700">Gender</legend>
                  <div className="mt-2 flex gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        checked={user.gender === 'Male'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        disabled={!editMode}
                      />
                      <label htmlFor="male" className="ml-2 block text-lg text-gray-700">Male</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={user.gender === 'Female'}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="female" className="ml-2 block text-lg text-gray-700">Female</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="Other"
                        checked={user.gender === 'Other'}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label htmlFor="other" className="ml-2 block text-lg text-gray-700">Other</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div>
                <label htmlFor="country" className="block text-2xl font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  id="country"
                  value={user.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                >
                  <option value="" disabled>Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Brazil">Brazil</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="China">China</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Russia">Russia</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>


                  
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-2xl font-medium text-gray-700">City</label>
                <input
                  name="city"
                  type="text"
                  id="city"
                  value={user.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="mt-1 block w-full border-gray-300 focus:ring-indigo-500  text-lg"
                />
              </div>
              <div className="col-span-2 flex space-x-4 justify-end">
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
              {editMode && (
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              )}
              </div>
            </form>
          )}
        </section>
        )}

        {/* Subscriptions */} 

        {activeSection === 'subscriptions' && (
          <section id="subscriptions" className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Manage Subscriptions</h2>
          {/* Manage Subscriptions Content Here */}
        </section>
        )}

        {/* Saved Articles*/}

        {activeSection === 'saved-articles' && (
    <section id="saved-articles" className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Saved Articles</h2>
          {loading ? (
            <p>Loading saved articles...</p>
          ) : savedArticles.length === 0 ? (
            <p>No saved articles found</p>
          ) : (
            <ul>
              {savedArticles.map((article, index) => (
                <li key={index} className="flex items-center justify-between mb-4">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{article.title}</a>
                  <button 
                    // onClick={() => handleUnsaveArticle(article.url)}
                    onClick={() => {
                      console.log('Unsave button clicked for article with title:', article.title); 
                      handleUnsaveArticle(article.title);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Unsave
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        )}

        
{activeSection === 'change-password' && (
    <section id="change-password" className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          {/* Change Password Form Here */}
        </section>
)}
      </main>
    </div>
  );
};

export default Profile;
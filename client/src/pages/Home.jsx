import React, { useState, useEffect } from 'react';
import { saveArticle, unsaveArticle ,shareArticleOnWhatsApp, shareArticleOnTwitter, shareArticleOnInstagram, shareArticleOnFacebook } from "../components/Articlefun";
import { FaBookmark, FaRegBookmark, FaShareAlt, FaWhatsapp, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showShareOptions, setShowShareOptions] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]); 
  const [savingError, setSavingError] = useState(null);
  const [unsavingError, setUnSavingError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchSavedArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/articles/saved-articles', {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSavedArticles(data);
      } 

    } catch (error) {
      console.error('Error fetching saved articles:', error);
    }
  };

  const handleSaveArticle = async (article) => {

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('Please sign in first'); 
      navigate('/signin'); 
      return;
    }

    try {
      const isSaved = isArticleSaved(article);
      if (isSaved) {
        alert('Article already saved');
      } else {
        await saveArticle(article);
        fetchSavedArticles(); // Refresh saved articles
      }
    } catch (error) {
      console.error('Error saving article:', error);
      setSavingError('Failed to save article.');
    }
  };
  const handleUnsaveArticle = async (article) => {
    try {
      await unsaveArticle(article);
      fetchSavedArticles(); // Refresh saved articles
    } catch (error) {
      console.error('Error unsaving article:', error);
      setUnSavingError('Failed to unsave article.');
    }
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(saved => saved.title === article.title);
  };

  const toggleShareOptions = (index) => {
    setShowShareOptions(showShareOptions === index ? null : index);
  };

 
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        setArticles(data.articles);
      } 
      catch (error) {
        console.error('Error fetching news:', error);
        setError('Error fetching news. Please try again later.');
      }
      finally {
        setLoading(false);
      }
    };

   
    fetchNews();
  
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;


  return (
    <div className="p-6 min-h-screen">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {articles.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div>
              <h5 className="text-xl font-semibold mb-2">{article.title}</h5>
              <p className="text-gray-700 mb-3">{article.description}</p>
              <a href={article.url} className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                Read more
              </a>


           {/* save and share buttons */}
 
          <div className="mt-2 flex space-x-2 relative">

          <button onClick={() => handleSaveArticle(article)} className={`text-blue-600 hover:text-blue- mt-2 mr-1 ${isArticleSaved(article) ? 'text-green-500' : ''}`}>

                  {isArticleSaved(article) ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />}
                </button>

                <button onClick={() => toggleShareOptions(index)} className="text-blue-600 hover:text-blue-800 mt-2 ">
                <FaShareAlt size={30} />
                </button>

                {/* Share buttons..*/}

                {showShareOptions === index && (
                  <div className="absolute bottom-8 left-8 bg-black rounded-lg p-5 w-78 flex flex-row ">

                    <button onClick={() => shareArticleOnWhatsApp(article)} className="text-green-500  mr-2 ">
                    <FaWhatsapp size={30}/>
                    </button>

                    <button onClick={() => shareArticleOnTwitter(article)} className=" text-blue-400 mr-2">
                    <FaTwitter size={30} />

                    </button>
                    <button onClick={() => shareArticleOnInstagram(article)} className="text-pink-500 mr-2 ">
                  <FaInstagram size={30}/>

                    </button>
                    <button onClick={() => shareArticleOnFacebook(article)} className="text-blue-500 mr-2">
                      <FaFacebook size={30}/>

                    </button>

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
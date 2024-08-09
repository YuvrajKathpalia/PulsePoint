import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { saveArticle, unsaveArticle, shareArticleOnWhatsApp, shareArticleOnTwitter, shareArticleOnInstagram, shareArticleOnFacebook } from '../components/Articlefun';
import { FaBookmark, FaRegBookmark, FaShareAlt, FaWhatsapp, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
};


const Categories = () => {
  const { category } = useParams(); 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [savingError, setSavingError] = useState(null);
  const [unsavingError, setUnSavingError] = useState(null);

  const token = localStorage.getItem('token');

  
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/news/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError('Error fetching news');
        console.error('Error fetching news:', error);
      } finally {
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
        if (Array.isArray(data)) {
          setSavedArticles(data);
        }
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    };

    

  useEffect(() => {
    fetchNews();
    fetchSavedArticles();
  }, [category, token]);

  
  const handleSaveArticle = async (article) => {
    if (!token) {
      alert('Please sign in first');
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



  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-700">{error}</div>;


 
//changed layout

  return (
     
    <div className="flex p-4 overflow-hidden">
    {/* Left Layout */}
    <div className="w-2/3 pr-6">
      {articles.slice(0, 10).map((article, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg shadow-lg mb-4 p-4 h-[300px] hover:bg-gray-100"
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="flex flex-col sm:flex-row h-full">
              <div className="sm:w-1/3 mb-4 sm:mb-0">
                <img
                  src={article.urlToImage } 
                  alt={article.title}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              </div>
              <div className="sm:w-2/3 flex flex-col justify-between pl-4">
                <h5 className="text-2xl font-bold mb-1 text-gray-900">{article.title}</h5>
                <p className="text-xl font-medium text-gray-700 mb-1">{article.description}</p>
                <p className="text-lg text-gray-500">{formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </a>
          {/* Save and Share Buttons */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button onClick={() => handleSaveArticle(article)} className={`text-blue-600 hover:text-blue-800 ${isArticleSaved(article) ? 'text-green-500' : ''}`}>
              {isArticleSaved(article) ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />}
            </button>
            <button onClick={() => toggleShareOptions(index)} className="text-blue-600 hover:text-blue-800">
              <FaShareAlt size={30} />
            </button>
            {showShareOptions === index && (
              <div className="absolute top-12 left-0 bg-black rounded-lg p-3 flex flex-row space-x-2">
                <button onClick={() => shareArticleOnWhatsApp(article)} className="text-green-500">
                  <FaWhatsapp size={25} />
                </button>
                <button onClick={() => shareArticleOnTwitter(article)} className="text-blue-400">
                  <FaTwitter size={25} />
                </button>
                <button onClick={() => shareArticleOnInstagram(article)} className="text-pink-500">
                  <FaInstagram size={25} />
                </button>
                <button onClick={() => shareArticleOnFacebook(article)} className="text-blue-500">
                  <FaFacebook size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>


       
      
      {/* Right Layout */}
      <div className="w-1/4 pl-7 pr-6">
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <h3 className="text-xl text-blue-500 font-semibold mb-4">More Articles</h3>
          <div className="space-y-4">
            {articles.slice(10, 21).map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg  p-2 border border-gray-200 hover:bg-gray-50 "
              >
                <div className="flex flex-col">
                  <img
                    src={article.urlToImage }
                    alt={article.title}
                    className="w-full h-[160px] object-cover rounded-lg mb-2"
                  />
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h5>
                  <p className="text-m text-gray-500">{formatDate(article.publishedAt)}</p>
                </div>
              </a>
            ))}
          </div>
          <Link to={`/more-articles/${category}?start=22`} className="block text-center mt-4 text-blue-500 hover:underline">
            See More
          </Link>
        </div>
       </div>
    
    </div>
  );
};

export default Categories;


/* //   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>
//       <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {articles.length === 0 ? (
//           <p>No articles available for this category.</p>
//         ) : (
//           articles.map((article, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
//             >
//               <img
//                 src={article.urlToImage}
//                 alt={article.title}
//                 className="w-full h-48 object-cover rounded-t-lg mb-4"
//               />
//               <div className="p-4">
//                 <h5 className="text-lg font-semibold mb-3">{article.title}</h5>
//                 <p className="text-gray-600 mb-1">{article.description}</p>
//                 <a
//                   href={article.url}
//                   className="text-blue-500 mt-2 inline-block hover:underline"
//                   target="_blank"
//                   rel="noopener noreferrer" 
//                 >
//                   Read more
//                 </a>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };
  

// export default Categories;
 */
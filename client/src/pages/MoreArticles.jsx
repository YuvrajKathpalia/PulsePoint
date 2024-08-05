import React, { useState, useEffect } from 'react';
import { useParams , useLocation } from 'react-router-dom'; 

const MoreArticles = () => {
  const { category } = useParams(); 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();    // Get the current location object
  const query = new URLSearchParams(location.search);  // Extract query parameters
  console.log(query);
  const startIndex = parseInt(query.get('start'), 22) ;  // Get the starting index


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/news/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles.slice(startIndex));
      } catch (error) {
        setError('Error fetching news');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, startIndex]); 

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-700">{error}</div>;

  //rendering articles from startindex 22 to --..
  
  return (
    <div className="p-6 min-h-screen">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img
              src={article.urlToImage }
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <div>
              <h5 className="text-xl font-semibold mb-2">{article.title}</h5>
              <p className="text-gray-700 mb-3">{article.description}</p>
              <a href={article.url} className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreArticles;

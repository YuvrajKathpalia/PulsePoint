import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 


const Categories = () => {
  const { category } = useParams(); 
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/news/${category}`);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category]); 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src={article.urlToImage || '/logo.PNG'}
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-1rem">
              <h5 className="text-lg font-semibold mb-3">{article.title}</h5>
              <p className="text-gray-600 mb-1">{article.description}</p>
              <a
                href={article.url}
                className="text-blue-500 mt-2 inline-block hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

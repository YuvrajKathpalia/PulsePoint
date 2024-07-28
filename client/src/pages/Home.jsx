// import React, { useState, useEffect } from 'react';
// import Hero from '../components/Hero'; 
// import '../style/style1.css';

// const Home = () => {
//   const [articles, setArticles] = useState([]);
//   const [query, setQuery] = useState('Olympics');

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/news');
//         const data = await response.json();
//         setArticles(data.articles);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/news/search?q=${query}`);
//       const data = await response.json();
//       setArticles(data.articles);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Hero Section */}
//       <Hero query={query} setQuery={setQuery} handleSearch={handleSearch} />

//       {/* Featured News */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {articles.map((article, index) => (
//           <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow">
//             <img
//               src={article.urlToImage || '/logo.PNG'} // Use brand logo if urlToImage is not available
//               alt={article.title}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <div className="card-body">
//               <h5 className="text-lg font-semibold">{article.title}</h5>
//               <p className="text-gray-600">{article.description}</p>
//               <a href={article.url} className="text-blue-500 mt-2 inline-block" target="_blank" rel="noopener noreferrer">
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;





// import React, { useState, useEffect } from 'react';
// import Hero from '../components/Hero'; 
// import '../style/style1.css';

// const Home = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/news');
//         const data = await response.json();
//         setArticles(data.articles);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Hero Section */}
//       <Hero />

//       {/* Featured News */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {articles.map((article, index) => (
//           <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow">
//             <img
//               src={article.urlToImage || '/logo.PNG'} // Use brand logo if urlToImage is not available
//               alt={article.title}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <div className="card-body">
//               <h5 className="text-lg font-semibold">{article.title}</h5>
//               <p className="text-gray-600">{article.description}</p>
//               <a href={article.url} className="text-blue-500 mt-2 inline-block" target="_blank" rel="noopener noreferrer">
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero'; 
import '../style/style1.css';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6">
      {/* Hero Section */}
      <Hero />

      {/* Featured News */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow">
            <img
              src={article.urlToImage || '/logo.PNG'} // Fallback to logo if urlToImage is not available
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="card-body">
              <h5 className="text-lg font-semibold">{article.title}</h5>
              <p className="text-gray-600">{article.description}</p>
              <a href={article.url} className="text-blue-500 mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;





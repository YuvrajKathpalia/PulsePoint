
const express = require('express');
const router = express.Router();


const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

router.get('/', async (req, res) => {
  try {
    const newsResponse = await fetch(NEWS_API_URL);
    const newsData = await newsResponse.json();

    if (!newsData.articles) {
      return res.status(500).json({ error: 'Failed to fetch news' });
    }

    
    const articlesWithFallbackImage = newsData.articles.map((article) => {
      
      return article;
    });

    res.json({ articles: articlesWithFallbackImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


//  (ex.. /news/health)

router.get('/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      res.json({ articles: data.articles });
    } else {
      res.status(400).json({ msg: 'Error fetching news' });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Server error');
  }
});



module.exports = router;




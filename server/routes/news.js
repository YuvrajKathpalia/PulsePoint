
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

module.exports = router;




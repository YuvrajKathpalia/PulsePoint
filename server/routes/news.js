const express = require('express');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const CATEGORY_URLS = {
  business: `https://newsapi.org/v2/everything?domains=moneycontrol.com,livemint.com,economictimes.indiatimes.com,business-standard.com,financialexpress.com&apiKey=${NEWS_API_KEY}`,
  entertainment: `https://newsapi.org/v2/everything?domains=pinkvilla.com,variety.com,hollywoodreporter.com,rollingstone.com,buzzfeed.com,etonline.com&apiKey=${NEWS_API_KEY}`,
  general: `https://newsapi.org/v2/everything?domains=nytimes.com,bbc.com,cnn.com,theguardian.com,aljazeera.com&apiKey=${NEWS_API_KEY}`,
  health: `https://newsapi.org/v2/everything?domains=thehindu.com,indianexpress.com,ndtv.com,nytimes.com,bbc.com&apiKey=${NEWS_API_KEY}`,
  science: `https://newsapi.org/v2/everything?domains=indianexpress.com,scientificamerican.com,nature.com,science.com,newscientist.com,the-scientist.com&apiKey=${NEWS_API_KEY}`,
  sports: `https://newsapi.org/v2/everything?domains=espncricinfo.com,indianexpress.com/sports,ndtv.com/sports,timesofindia.indiatimes.com/sports,sports.ndtv.com&apiKey=${NEWS_API_KEY}`,
  technology: `https://newsapi.org/v2/everything?domains=techcrunch.com,indiatoday.in/technology,livemint.com/technology,bs.com,tech2.com&apiKey=${NEWS_API_KEY}`
};

router.get('/', async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/everything?domains=timesofindia.indiatimes.com,ndtv.com&apiKey=${NEWS_API_KEY}`;
    const newsResponse = await fetch(url);
    const newsData = await newsResponse.json();

    if (!newsData.articles) {
      return res.status(500).json({ error: 'Failed to fetch news' });
    }

    
    res.json({ articles: newsData.articles });
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/:category', async (req, res) => {
  const { category } = req.params;

  if (!CATEGORY_URLS[category]) {
    return res.status(404).json({ error: 'Category not found' });
  }

  try {
    const url = CATEGORY_URLS[category];
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) {
      return res.status(500).json({ error: 'Failed to fetch news' });
    }

    res.json({ articles: data.articles });
  } catch (err) {
    console.error('Error fetching news for category:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;





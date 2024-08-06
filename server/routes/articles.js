const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/Auth'); // Middleware for token verification

// save article
router.post('/save-article', authenticate, async (req, res) => {

  const { title, urlToImage } = req.body; //extract title,urlimage
  const userId = req.user.id; // Get userid from middleware
  console.log(userId);

  try {
    const user = await User.findById(userId);

    // Check if the article is already saved by the userr

    if (user.savedArticles.some(article => article.title === title)) {
      return res.status(400).json({ msg: 'Article already saved' });
    }

    // Add new article to user saved articles

    user.savedArticles.push({ title, urlToImage });
    await user.save();

    res.status(200).json({ msg: 'Article saved successfully' });
  } 
  catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ msg: 'Failed to save article' });
  }
});
router.delete('/unsave-article', authenticate, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the article is already saved
    if (!user.savedArticles.some(article => article.title === title)) {
      return res.status(400).json({ msg: 'Article not saved' });
    }

    // Remove the article from the user's saved articles
    user.savedArticles = user.savedArticles.filter(article => article.title !== title);
    await user.save();

    res.status(200).json({ msg: 'Article unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving article:', error);
    res.status(500).json({ msg: 'Failed to unsave article' });
  }
});


// Route to get saved articles
router.get('/saved-articles', authenticate, async (req, res) => {
  const userId = req.user.id; // Get user ID from middleware

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(200).json(user.savedArticles);
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({ msg: 'Failed to fetch saved articles' });
  }
});

module.exports = router;


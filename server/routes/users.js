const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const auth = require("../middleware/Auth.js")

// Get user profile
router.get('/profile', auth, async (req, res) => {
  
  const user = await User.findById(req.user.id);
  res.json(user);
});

// Update user profile

router.put('/profile', auth, async (req, res) => {

  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
  res.json(user);
});

module.exports = router;

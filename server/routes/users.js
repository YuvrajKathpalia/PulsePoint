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

router.put('/update-profile', auth, async (req, res) => {
  const { username, email, phone, dob, gender, country, city } = req.body;

  console.log('Received dob:', dob);
  
  try {

    const dobDate = dob ? new Date(dob) : undefined;  // Convert dob to dateobject

    const user = await User.findByIdAndUpdate(req.user.id, 
      { username, email, phone,dob: dobDate , gender, country, city }, 
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to update profile', error: error.message });
  }
});

   


module.exports = router;

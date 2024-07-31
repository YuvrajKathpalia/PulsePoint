const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    
    user = new User({
      username,
      email,
      password,
    });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    
    await user.save();

     // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

   // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 }, // Token expires in 100 hours
      (err, token) => {
        if (err) throw err;
        // Send response with token and user details
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

  
    const payload = {
      user: {
        id: user.id,
      },
    };

    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 }, 
      (err, token) => {
        if (err) throw err;
        // Send response with token
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

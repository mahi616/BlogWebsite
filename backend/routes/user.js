const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');


// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// route
// router.put('/profile/:id', upload.single('profileImage'), updateUserProfile);


// @route PUT /api/user/profile/:id
// @desc  Update user profile (about, profile image, name, etc.)
router.put('/profile/:id', async (req, res) => {
  try {
    const { fullName, about, profile } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, about, profile },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

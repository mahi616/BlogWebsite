const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for profile images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // safe cross-platform path
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// --------------------- UPDATE USER PROFILE ---------------------
router.put('/profile/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const { fullName, about } = req.body;
    const updatedData = { fullName, about };

    if (req.file) {
      updatedData.profile = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return only necessary fields
    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profile: user.profile || '',
        about: user.about || ''
      }
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

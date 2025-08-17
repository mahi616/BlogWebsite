const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // ensures emails are lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  profile: {                 // renamed profileImage -> profile for consistency
    type: String,
    default: '',
  },
  about: {
    type: String,
    maxlength: 500,
    default: '',
    trim: true
  },
}, { timestamps: true });    // createdAt & updatedAt

// --------------------- INDEXES ---------------------
// Fast lookup by email
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);

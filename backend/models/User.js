const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage: {
    type: String, // Expecting a URL (e.g., from a file upload or external host)
    default: '',  // Optional default
  },

  about: {
    type: String,
    maxlength: 500,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User',userSchema);
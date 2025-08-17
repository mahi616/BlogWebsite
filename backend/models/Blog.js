const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, trim: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// --------------------- INDEXES ---------------------
// Fast queries for latest blogs
blogSchema.index({ createdAt: -1 });
blogSchema.index({ author: 1 });

module.exports = mongoose.model('Blog', blogSchema);

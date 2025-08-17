const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');
const User = require('../models/User');

// Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// --------------------- CREATE BLOG ---------------------
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      image: imagePath,
      author,
      createdAt: new Date(),
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------- GET BLOGS BY USER ---------------------
router.get('/user/:userId', async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.userId })
      .select('title excerpt content image createdAt')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(blogs);
  } catch (err) {
    console.error('Fetch user blogs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------- GET SINGLE BLOG ---------------------
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'fullName')
      .lean();

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({
      id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      date: blog.createdAt,
      author: blog.author?.fullName || 'Unknown'
    });
  } catch (err) {
    console.error('Blog fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------- UPDATE BLOG ---------------------
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const updatedData = { title, excerpt, content };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true }).lean();

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: 'Blog updated', blog });
  } catch (err) {
    console.error('Update blog error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------- DELETE BLOG ---------------------
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------- GET ALL BLOGS (PAGINATED) ---------------------
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // page number
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'fullName')
      .select('title excerpt content image createdAt author')
      .lean();

    const formattedBlogs = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      date: blog.createdAt,
      author: blog.author?.fullName || 'Unknown'
    }));

    res.status(200).json(formattedBlogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

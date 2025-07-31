const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog'); // <-- your Blog model
const User = require('../models/User')

// multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });






// POST route - create blog
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({
      title,
      excerpt,
      content,
      image: imagePath,
      author: req.body.author,
      createdAt: new Date(),
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// GET /api/blogs/user/:userId - get perticular user
router.get('/user/:userId', async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.userId });
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Fetch user blogs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// get perticular blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'fullName');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error('Blog fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT - update blog 
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const updatedData = { title, excerpt, content };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
});




// DELETE /api/blogs/:id - delete perticular blog
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});



// GET /api/blogs - Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'fullName'); // only return fullName of author

    const formattedBlogs = blogs.map((blog) => ({
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

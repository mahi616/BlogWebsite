const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://mohit-blog-website.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRoutes);

// DB Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => {
  console.error('❌ DB Connection Error:', err);
  process.exit(1);
});

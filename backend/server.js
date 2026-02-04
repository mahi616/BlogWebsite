// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const adminRoutes =require('./routes/adminRoutes')
const adminAuthRoutes = require('./routes/adminAuth')

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const url = 'https://blogwebsite-backend-pabe.onrender.com';
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response)=>{
      console.log('website reloaded');
    })
    .catch((error)=>{
      console.log(`Error : ${error.message}`);
      
    })
}
setInterval(reloadWebsite, interval);

// CORS Configuration
app.use(cors({
  origin: 'https://mohit-blog-website.vercel.app', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Body parser
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin',adminRoutes);
app.use('/api/admin', adminAuthRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRoutes);

// DB Connection & Server Start

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ DB Connection Error:', err);
  process.exit(1);
});

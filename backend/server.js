
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/user')
const path = require('path');
// const serverless = require('serverless-http')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/blogs',blogRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Mongo Atlas connected');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
})
.catch((err) => console.error(err));

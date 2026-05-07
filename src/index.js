require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts.routes');
require('./models/user.model');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/posts', postsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Blogify API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
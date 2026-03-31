const express = require('express');
const app = express();
const PORT = 3000;

const postRouter = require('./routes/posts.routes.js');

app.get('/', (req, res) => {
  res.send('Welcome to the Blogify API!');
});

app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
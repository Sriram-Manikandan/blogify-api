const postService = require('../services/posts.service');

/**
 * GET /api/v1/posts
 * Retrieves all posts.
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/v1/posts/:id
 * Retrieves a single post by ID.
 */
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/v1/posts
 * Creates a new post.
 */
const createPost = async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const newPost = await postService.createPost({ title, body, author });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/v1/posts/:id
 * Updates an existing post by ID.
 */
const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /api/v1/posts/:id
 * Deletes a post by ID.
 */
const deletePost = async (req, res) => {
  try {
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
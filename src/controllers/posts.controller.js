const getAllPosts = (req, res) => {
  res.status(200).json({
    message: 'Route handled by postController.getAllPosts'
  });
};

module.exports = {
  getAllPosts,
};

const getPostById = (req, res) => {
  const postId = req.params.postId;

  res.status(200).json({
    message: `Fetching data for post with ID: ${postId}`
  });
};

module.exports = {
  getAllPosts,
  getPostById,
};
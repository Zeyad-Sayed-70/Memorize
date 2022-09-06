const express = require("express");
const {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  delPost,
  likePost,
  getPostsBySearch,
  commnetPost,
  updatePosts,
} = require("../controls/posts");
const router = express.Router();

router.route("/").get(getAllPosts).post(addPost).patch(updatePosts);
router.route("/search").get(getPostsBySearch);
router.route("/:id").get(getPost).patch(updatePost).delete(delPost);
router.route("/:id/comment").patch(commnetPost);
router.route("/:id/likepost").patch(likePost);

module.exports = router;

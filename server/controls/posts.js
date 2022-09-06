const Posts = require("../models/postsMessages");

const getAllPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const postsMessage = await Posts.find({})
      .sort({ _id: -1 })
      .limit(12)
      .skip((page - 1) * 12);
    const postsCount = await Posts.countDocuments();
    res.status(200).json({ posts: postsMessage, count: postsCount });
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.find({ _id: id });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags, page } = req.query;

  let newTags = tags?.split(",");
  newTags = newTags.filter((tag) => tag !== "").map((tag) => tag.toLowerCase());

  try {
    const title = new RegExp(searchQuery, "i");
    const searchPosts = await Posts.find({
      $or: [{ title }, { tags: { $in: newTags } }],
    })
      .limit(12)
      .skip((page - 1) * 12);

    const postsCount = await Posts.find({
      $or: [{ title }, { tags: { $in: newTags } }],
    }).countDocuments();

    res.json({ posts: searchPosts, count: postsCount });
  } catch (error) {
    console.log(error);
  }
};

const addPost = async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    await newPost.save();

    res.send(newPost);
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Posts.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

const updatePosts = async (req, res) => {
  try {
    const { id, post } = req.body;
    const newPost = await Posts.updateMany(
      { creator_id: id },
      { creator_img: post }
    );
    res.json(newPost);
  } catch (error) {
    console.log(error);
  }
};

const delPost = async (req, res) => {
  try {
    const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id });
    res.json(deletedPost);
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const likedPost = await Posts.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(likedPost);
  } catch (error) {
    console.log(error);
  }
};

const commnetPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const post = await Posts.findById(id);

    post.comments.push(data);

    const newPost = await Posts.findOneAndUpdate({ _id: id }, post, {
      new: true,
    });

    res.json(newPost);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  delPost,
  likePost,
  getPostsBySearch,
  commnetPost,
  updatePosts,
};

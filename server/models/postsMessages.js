const mongoose = require("mongoose");
const { Schema } = mongoose;

const Posts = new Schema({
  title: String,
  message: String,
  creator: String,
  creator_img: String,
  creator_id: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    count: {
      type: Number,
      default: 0,
    },
    users: Array,
  },
  comments: { type: [String], default: [] },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("postMessage", Posts);

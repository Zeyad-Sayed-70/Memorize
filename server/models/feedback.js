const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
  sendAt: { type: String, default: new Date().getTime() },
  sendBy_id: String,
  sendBy_name: String,
  sendBy_img: String,
  message: String,
});

module.exports = mongoose.model("feedback", feedback);

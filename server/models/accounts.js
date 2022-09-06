const mongoose = require("mongoose");
const { Schema } = mongoose;

const accounts = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profile_img: String,
});

module.exports = mongoose.model("account", accounts);

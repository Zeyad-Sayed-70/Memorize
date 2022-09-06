const feedback = require("../models/feedback");

const getFeedbacks = async (req, res) => {
  try {
    res.send("get feedback");
  } catch (error) {
    console.log(error);
  }
};

const postFeedBack = async (req, res) => {
  try {
    const newFeedback = await feedback.insertMany(req.body);
    res.send(newFeedback);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getFeedbacks, postFeedBack };

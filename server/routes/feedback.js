const express = require("express");
const routerFeedback = express.Router();
const { postFeedBack, getFeedbacks } = require("../controls/feedback");

routerFeedback.route("/").get(getFeedbacks).post(postFeedBack);

module.exports = routerFeedback;

const express = require("express");
const router = express.Router();
const {
  post_signup,
  post_signin,
  updateAccount,
} = require("../controls/account");

router.route("/signup").post(post_signup);
router.route("/signin").post(post_signin);
router.route("/:id").patch(updateAccount);

module.exports = router;

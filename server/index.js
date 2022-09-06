const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const routerPosts = require("./routes/posts");
const routerAccounts = require("./routes/accounts");
const routerFeedback = require("./routes/feedback");

const app = express();

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use("/posts", routerPosts);
app.use("/accounts", routerAccounts);
app.use("/feedback", routerFeedback);

app.get("/", (req, res) => {
  res.send("server");
});

// Connection Settings
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on port : ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const account = require("../models/accounts");

const getAccounts = async (req, res) => {
  try {
    const accounts = await account.find();
    res.json(accounts);
  } catch (error) {
    console.log(error);
  }
};

const post_signup = async (req, res) => {
  const newAccount = new account({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profile_img: "",
  });

  try {
    const isValid = await account.findOne({ email: newAccount.email });
    console.log(isValid);
    if (isValid) {
      res.send({ message: "this account has been exist" });
    } else {
      newAccount.save();
      res.json(newAccount);
    }
  } catch (error) {
    console.log(error);
  }
};

const post_signin = async (req, res) => {
  const userAccount = new account({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const isValid = await account.findOne({
      email: userAccount.email,
      password: userAccount.password,
    });

    if (isValid) {
      res.json(isValid);
    } else {
      res.json({ message: "this account is not exist!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const newAccount = await account.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log(newAccount);
    res.json(newAccount);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { post_signup, post_signin, updateAccount };

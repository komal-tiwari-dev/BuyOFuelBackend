const express = require("express");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const alreadyUser = await userModel.find({ email });
  if (alreadyUser.length > 0) {
    return res.send("User Already Exists");
  }
  await bcrypt.hash(password, 6, function (err, hash) {
    if (err) {
      res.send("Please try again");
    }
    const user = new userModel({
      email,
      password: hash,
    });
    user.save();
    res.send("SignUp Successfull ");
  });
});

// User Login
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send("User not Found");
  }

//   console.log(user);
  const hash = user.password;
  const userId = user._id;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      var token = jwt.sign({ email, userId }, process.env.SECRET_KEY);
      return res.send({
        message: "Login Successfull",
        token: token,
        Teachername: user.name,
      });
    } else {
      res.send("Invalid Credentials");
    }
  });
});

module.exports = userRoute;

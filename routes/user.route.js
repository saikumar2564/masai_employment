const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const payload = req.body;
  try {
    const userExists = await UserModel.findOne({ Email: payload.Email });
    if (userExists) return res.json({ message: "User exists, Please login" });
    bcrypt.hash(payload.Password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ error: "Something went wrong" });
      }
      payload.Password = hash;
      const user = new UserModel(payload);
      await user.save();
      return res
        .status(200)
        .json({ message: "Successfully Registered, Please Login" });
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const payload = req.body;
  try {
    const userExists = await UserModel.findOne({ Email: payload.Email });
    if (!userExists)
      return res.json({ message: "User does not exists, Please Register" });
    bcrypt.compare(
      payload.Password,
      userExists.Password,
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(404).json({ error: "Something went wrong" });
        }
        if (!result)
          return res.status(404).json({ message: "Invalid Credentials" });
        const token = jwt.sign(
          { userEmail: userExists.Email },
          process.env.JWT_SECRET,
          { expiresIn: "1H" }
        );
        return res
          .status(200)
          .json({ message: "Login Successful", token: token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
});

module.exports = { userRouter };

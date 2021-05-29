const express = require("express");
const { User } = require("../models/users.model");
const userRouter = express.Router();

userRouter.post("/", async function (req, res) {
  const newUser = new User({ name: "Nguyễn Van A", email: "haohao@gmail.com" });
  await newUser.save();
  res.status(201).send(newUser);
});

userRouter.get("/", function (req, res) {
  res.send("Get ALL");
});

module.exports = {
  userRouter,
};

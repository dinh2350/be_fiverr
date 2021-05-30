const express = require("express");
// Model
const { User } = require("../app/models/users.model");
// Controllers
const { getAllUser, getUserById } = require("../app/controllers/user.controler");
const userRouter = express.Router();


// Get all list User
userRouter.get("/", getAllUser);
//  Get user by id
userRouter.get("/:id", getUserById);
//  Create User
userRouter.post("/", async function (req, res) {
  const newUser = new User({
    avatar: "abc",
    first_name: "manh dat",
    last_name: "vo",
  });

  await newUser.save();
  res.status(201).send(newUser);
}); 
//Edit Info User


//Delete User by id


module.exports = {
  userRouter,
};

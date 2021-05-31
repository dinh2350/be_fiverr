const express = require("express");
// Controllers
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../app/controllers/user.controler");

const userRouter = express.Router();

// Get all list user
userRouter.get("/", getAllUser);
//  Get user by id
userRouter.get("/:id", getUserById);
//  Create User
userRouter.post("/", createUser);
//Edit Info User
userRouter.put("/:id", updateUser);
//Delete User by id
userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};

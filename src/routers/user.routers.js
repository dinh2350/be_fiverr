const express = require("express");
// Controllers
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
} = require("../controllers/user.controler");
const { authenticate } = require("../middlewares/auth/verify-token.middlewares");
const { uploadImageSingle } = require("../middlewares/upload-file/upload-image.middlewares");
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
// upload avatar
userRouter.post("/upload-avatar", authenticate, uploadImageSingle("avatar"), uploadAvatar);

module.exports = {
  userRouter,
};

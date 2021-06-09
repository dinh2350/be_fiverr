const express = require("express");
// Controllers
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getPaginationAndSearch,
} = require("../controllers/user.controler");
const { uploadImageSingle } = require("../middlewares/upload-file/upload-image.middlewares");
const userRouter = express.Router();
const { authenticate, authorize } = require("../middlewares/auth/verify-token.middlewares");
// extend
userRouter.get("/pagination-search", authenticate, authorize(["ADMIN"]), getPaginationAndSearch);

// Get all list user
userRouter.get("/", authenticate, authorize(["ADMIN"]), getAllUser);
//  Get user by id
userRouter.get("/:id", authenticate, authorize(["ADMIN"]), getUserById);
//  Create User
userRouter.post("/", authenticate, authorize(["ADMIN"]), createUser);
//Edit Info User
userRouter.put("/:id", authenticate, authorize(["ADMIN"]), updateUser);
//Delete User by id
userRouter.delete("/:id", authenticate, authorize(["ADMIN"]), deleteUser);
// upload avatar
userRouter.post("/upload-avatar", authenticate, uploadImageSingle("avatar"), uploadAvatar);

module.exports = {
  userRouter,
};

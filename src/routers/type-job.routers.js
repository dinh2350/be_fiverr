const express = require("express");
// Controllers
const { create, getAll } = require("../controllers/type-job.controller");

const typeJobRouter = express.Router();

// Get all list user
typeJobRouter.get("/", getAll);
//  Get user by id
// typeJobRouter.get("/:id", getUserById);
//  Create User
typeJobRouter.post("/", create);
//Edit Info User
// typeJobRouter.put("/:id", updateUser);
//Delete User by id
// typeJobRouter.delete("/:id", deleteUser);

module.exports = {
  typeJobRouter,
};

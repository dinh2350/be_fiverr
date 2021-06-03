const express = require("express");
// Controllers
const { create, getAll } = require("../controllers/sub-type-job-controller");

const subTypeJobRouter = express.Router();

// Get all list user
subTypeJobRouter.get("/", getAll);
//  Get user by id
// subTypeJobRouter.get("/:id", getUserById);
//  Create User
subTypeJobRouter.post("/", create);
//Edit Info User
// subTypeJobRouter.put("/:id", updateUser);
//Delete User by id
// subTypeJobRouter.delete("/:id", deleteUser);

module.exports = {
  subTypeJobRouter,
};

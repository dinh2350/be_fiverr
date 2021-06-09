const express = require("express");
// Controllers
const { create, getAll, getDetail, update, remove } = require("../controllers/sub-type-job-controller");

const subTypeJobRouter = express.Router();

// Get all list user
subTypeJobRouter.get("/", getAll);
//  Get user by id
subTypeJobRouter.get("/:id", getDetail);
//  Create User
subTypeJobRouter.post("/", create);
//Edit Info User
subTypeJobRouter.put("/:id", update);
//Delete User by id
subTypeJobRouter.delete("/:id", remove);

module.exports = {
  subTypeJobRouter,
};

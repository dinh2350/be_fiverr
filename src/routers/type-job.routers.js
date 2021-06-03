const express = require("express");
// Controllers
const { create, getAll, remove, update, getDetail, pagination } = require("../controllers/type-job.controller");

const typeJobRouter = express.Router();

// pagination
typeJobRouter.get("/pagination", pagination);
// Get all list user
typeJobRouter.get("/", getAll);
//  Get user by id
typeJobRouter.get("/:id", getDetail);
//  Create User
typeJobRouter.post("/", create);
//Edit Info User
typeJobRouter.put("/:id", update);
//Delete User by id
typeJobRouter.delete("/:id", remove);

module.exports = {
  typeJobRouter,
};

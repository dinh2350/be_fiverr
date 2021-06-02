const express = require("express");
// Controllers
const {
  create,
  update,
  getAll,
  getDetail,
  remove,
} = require("../controllers/jobs.controller");

const jobsRouter = express.Router();

// Get all list Jobs
jobsRouter.get("/", getAll);
//  Get Jobs by id
jobsRouter.get("/:id", getDetail);
//  Create Jobs
jobsRouter.post("/", create);
//Edit Info Jobs
jobsRouter.put("/:id", update);
//Delete Jobs by id
jobsRouter.delete("/:id", remove);

module.exports = {
  jobsRouter,
};

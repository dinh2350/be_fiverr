const express = require("express");
// Controllers
const {
  create,
  update,
  getAll,
  getDetail,
  remove,
  getByType,
  getBySubType,
  booking,
  getJobByUser,
  doneJob,
} = require("../controllers/jobs.controller");
const { authenticate } = require("../middlewares/auth/verify-token.middlewares");
const jobsRouter = express.Router();

// extends
jobsRouter.get("/by-sub-type", getBySubType);
jobsRouter.get("/by-type", getByType);
// booking
jobsRouter.patch("/booking/:id", authenticate, booking);
// done job
jobsRouter.patch("/done/:id", authenticate, doneJob);
// getByUser
jobsRouter.get("/by-user", authenticate, getJobByUser);
// Get all list Jobs
jobsRouter.get("/", getAll);
//  Get Jobs by id
jobsRouter.get("/:id", getDetail);
//  Create Jobs
jobsRouter.post("/", authenticate, create);
//Edit Info Jobs
jobsRouter.put("/:id", update);
//Delete Jobs by id
jobsRouter.delete("/:id", remove);

module.exports = {
  jobsRouter,
};

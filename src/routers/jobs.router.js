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
  getByName,
  uploadImage,
} = require("../controllers/jobs.controller");
const { authenticate, authorize } = require("../middlewares/auth/verify-token.middlewares");
const { uploadImageMultiple } = require("../middlewares/upload-file/upload-image.middlewares");
const jobsRouter = express.Router();

// extends
jobsRouter.post("/upload-image/:id", authenticate, authorize(["ADMIN"]), uploadImageMultiple("job", 10), uploadImage);
jobsRouter.get("/by-sub-type", getBySubType);
jobsRouter.get("/by-type", getByType);
jobsRouter.get("/by-name", getByName);
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

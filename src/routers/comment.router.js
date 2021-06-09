const express = require("express");
const { authenticate } = require("../middlewares/auth/verify-token.middlewares");
// Controllers
const { create, getByJob } = require("../controllers/comments.controller");

const commentRouter = express.Router();

//
commentRouter.post("/", authenticate, create);
commentRouter.get("/by-job/:idJob", getByJob);
module.exports = {
  commentRouter,
};

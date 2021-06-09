const express = require("express");
// Import Router
const { userRouter } = require("./user.routers");
const { subTypeJobRouter } = require("./sub-type-job.routers");
const { typeJobRouter } = require("./type-job.routers");
const { jobsRouter } = require("./jobs.router");
const { authRouter } = require("./auth.router");
const { commentRouter } = require("./comment.router");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/sub-type-jobs", subTypeJobRouter);
rootRouter.use("/type-jobs", typeJobRouter);
rootRouter.use("/jobs", jobsRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/comments", commentRouter);
module.exports = {
  rootRouter,
};

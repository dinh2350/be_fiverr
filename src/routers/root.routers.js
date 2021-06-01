const express = require("express");
// Import Router
const { userRouter } = require("./user.routers");
const { subTypeJobRouter } = require("./sub-type-job.routers");
const { typeJobRouter } = require("./type-job.routers");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/sub-type-jobs", subTypeJobRouter);
rootRouter.use("/type-jobs", typeJobRouter);
module.exports = {
  rootRouter,
};

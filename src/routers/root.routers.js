const express = require("express");
// Import Router
const { userRouter } = require("./user.routers");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);

module.exports = {
  rootRouter,
};

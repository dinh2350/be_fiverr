const express = require("express");
const path = require("path");
const { verifyTokenByClass } = require("./src/middlewares/token/verifyTokenByClass");
// Import Router
const { rootRouter } = require("./src/routers/root.routers");
// Mongo
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost/fiverr_db", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.get("/", (req, res) => {
  res.send("Hello :))");
});

const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.use(express.json());
app.use("/api", verifyTokenByClass, rootRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

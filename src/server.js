const express = require("express");
const { rootRouter } = require("./routers/root.routers");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fiverr_db", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use("/api", rootRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

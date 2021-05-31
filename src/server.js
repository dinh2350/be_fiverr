const express = require("express");
// Import Router
const { rootRouter } = require("./routers/root.routers");
// Mongo
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fiverr_db", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use("/api", rootRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

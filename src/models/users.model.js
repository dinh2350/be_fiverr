const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = model("User", userSchema);

module.exports = {
  userSchema,
  User,
};

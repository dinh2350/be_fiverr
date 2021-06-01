const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  avatar: String,
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  languages: {
    type: Array,
  },
  linkAccount: {
    type: Array,
  },
  skill: {
    type: Array,
  },
  certification: {
    type: Array,
  },
  role: String,
});

const User = model("User", userSchema);

module.exports = {
  userSchema,
  User,
};

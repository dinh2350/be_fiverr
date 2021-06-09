const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  avatar: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone: String,
  birthday: Date,
  gender: Boolean, // true là nam , false là nữ
  skill: {
    type: [String],
  },
  certification: {
    type: [String],
  },
  role: String,
  bookingJob: [
    {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
});

const User = model("User", userSchema);

module.exports = {
  userSchema,
  User,
};

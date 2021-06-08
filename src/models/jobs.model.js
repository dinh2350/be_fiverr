const { Schema, model } = require("mongoose");

const jobsShema = new Schema({
  name: String,
  images: [String],
  rating: {
    type: Number,
  },
  price: Number,
  proServices: Boolean,
  localSellers: Boolean,
  onlineSellers: Boolean,
  deliveryTime: Boolean,
  type: {
    type: Schema.Types.ObjectId,
    ref: "TypeJob",
  },
  subType: {
    type: Schema.Types.ObjectId,
    ref: "SubTypeJob",
  },
  status: Boolean, // true là open , false là busy
  reviewsId: String,
  userCreated: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  usersBooking: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Jobs = model("Jobs", jobsShema);

module.exports = {
  jobsShema,
  Jobs,
};

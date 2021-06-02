const { Schema, model } = require("mongoose");

const jobsShema = new Schema({
  name: String,
  images: [String],
  rating: {
    type: Number,
  },
  price: [Object],
  proServices: Boolean,
  localSellers: Boolean,
  onlineSellers: Boolean,
  deliveryTime: Boolean,
  type: {
    type: Schema.Types.ObjectId,
    ref: "TypeJob",
  },
  reviewsId: String,
});

const Jobs = model("Jobs", jobsShema);

module.exports = {
  jobsShema,
  Jobs,
};

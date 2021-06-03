const { Schema, model } = require("mongoose");

const subTypeJobSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

const SubTypeJob = model("SubTypeJob", subTypeJobSchema);

module.exports = {
  subTypeJobSchema,
  SubTypeJob,
};

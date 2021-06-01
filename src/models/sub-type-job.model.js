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
  typeJobId: {
    type: Schema.Types.ObjectId,
    ref: "TypeJob",
  },
});

const SubTypeJob = model("SubTypeJob", subTypeJobSchema);

module.exports = {
  subTypeJobSchema,
  SubTypeJob,
};

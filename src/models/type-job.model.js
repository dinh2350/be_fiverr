const { Schema, model } = require("mongoose");

const typeJobSchema = new Schema({
  name: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  subTypeJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubTypeJob",
    },
  ],
});

const TypeJob = model("TypeJob", typeJobSchema);

module.exports = {
  typeJobSchema,
  TypeJob,
};

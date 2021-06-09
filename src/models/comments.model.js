const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Jobs",
  },
});

const Comment = model("Comment", commentSchema);

module.exports = {
  commentSchema,
  Comment,
};

const { Comment } = require("../models/comments.model");
const { Jobs } = require("../models/jobs.model");
const create = async (req, res) => {
  const _id = req.user;
  try {
    const newComment = new Comment({
      ...req.body,
      user: _id,
    });

    await newComment.save();
    res.status(201).send(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getByJob = async (req, res) => {
  const { idJob } = req.params;
  try {
    const comments = await Comment.find({
      job: idJob,
    })
      .populate("user")
      .exec();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getByJob,
};

const { SubTypeJob } = require("../models/sub-type-job.model");
const create = async (req, res) => {
  const { name, status, typeJobId } = req.body;
  try {
    const newSubTypeJob = new SubTypeJob({ name, status, typeJobId });
    await newSubTypeJob.save();
    res.status(200).send(newSubTypeJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
};

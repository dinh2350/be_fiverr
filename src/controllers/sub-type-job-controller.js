const { SubTypeJob } = require("../models/sub-type-job.model");
const { TypeJob } = require("../models/type-job.model");
const create = async (req, res) => {
  const { name, status, typeJob } = req.body;
  try {
    const newSubTypeJob = new SubTypeJob({ name, status, typeJob });
    await newSubTypeJob.save();
    const detailTypeJob = await TypeJob.findById(typeJob).exec();
    detailTypeJob.subTypeJobs.push(newSubTypeJob._id);
    await detailTypeJob.save();
    res.status(200).send(newSubTypeJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    let list = await SubTypeJob.find().populate("typeJob");
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SubTypeJob.findById(id).populate("typeJob").exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SubTypeJob.findByIdAndUpdate(id, { ...req.body }).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SubTypeJob.findByIdAndDelete(id).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  create,
  getAll,
  getDetail,
  update,
  remove,
};

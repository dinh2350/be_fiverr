const { TypeJob } = require("../models/type-job.model");

// CRUD
const create = async (req, res) => {
  try {
    const newTypeJob = new TypeJob({ ...req.body });
    await newTypeJob.save();
    res.status(200).send(newTypeJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    let list = await TypeJob.find().populate("subTypeJobs");
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TypeJob.findById(id).populate("subTypeJobs").exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TypeJob.findByIdAndUpdate(id, { ...req.body }).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(err);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TypeJob.findByIdAndDelete(id).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// extend
const pagination = async (req, res) => {
  const { skip, limit } = req.query;
  try {
    const result = await TypeJob.find({}, null, {
      skip: +skip,
      limit: +limit,
    }).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getAll,
  remove,
  update,
  getDetail,
  pagination,
};

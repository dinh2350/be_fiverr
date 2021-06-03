const { Jobs } = require("../models/jobs.model");

// CRUD
const create = async (req, res) => {
  try {
    const newJob = new Jobs({
      ...req.body,
    });

    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const { name, images, rating, price, proServices, localSellers, onlineSellers, deliveryTime, type, reviewsId } =
    req.body;

  const byId = {
    _id: id,
  };

  try {
    let jobEdit = await Jobs.findOne(byId).exec();

    if (jobEdit) {
      jobEdit.name = name;
      jobEdit.images = images;
      jobEdit.rating = rating;
      jobEdit.price = price;
      jobEdit.proServices = proServices;
      jobEdit.localSellers = localSellers;
      jobEdit.onlineSellers = onlineSellers;
      jobEdit.deliveryTime = deliveryTime;
      jobEdit.type = type;
      jobEdit.reviewsId = reviewsId;

      await jobEdit.save();

      res.status(200).send(jobEdit);
    } else {
      res.status(400).send("Job not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const allList = await Jobs.find().populate("type").populate("subType");

    res.status(200).send(allList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;

  const byId = {
    _id: id,
  };

  try {
    const detailJob = await Jobs.find(byId).exec();

    if (detailJob) {
      res.status(200).send(detailJob);
    } else {
      res.status(400).send("Job not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const byId = {
    _id: id,
  };

  try {
    const deleteJob = await Jobs.deleteOne(byId).exec();

    res.status(200).send(deleteJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

// extends

const getByType = async (req, res) => {
  const { skip, limit, type } = req.query;
  try {
    var result = await Jobs.find(
      {
        type: type,
      },
      null,
      {
        skip: +skip,
        limit: +limit,
      }
    ).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBySubType = async (req, res) => {
  const { skip, limit, subType } = req.query;
  try {
    var result = await Jobs.find(
      {
        subType: subType,
      },
      null,
      {
        skip: +skip,
        limit: +limit,
      }
    ).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  update,
  getAll,
  getDetail,
  remove,
  getByType,
  getBySubType,
};

const { Jobs } = require("../models/jobs.model");
const { User } = require("../models/users.model");
const { config } = require("../configs");
// CRUD
const create = async (req, res) => {
  const _id = req.user;
  try {
    const newJob = new Jobs({
      ...req.body,
      status: true,
      userCreated: _id,
    });

    await newJob.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const update = async (req, res) => {
//   const { id } = req.params;

//   const { name, images, rating, price, proServices, localSellers, onlineSellers, deliveryTime, type, reviewsId } =
//     req.body;

//   const byId = {
//     _id: id,
//   };

//   try {
//     let jobEdit = await Jobs.findOne(byId).exec();

//     if (jobEdit) {
//       jobEdit.name = name;
//       jobEdit.images = images;
//       jobEdit.rating = rating;
//       jobEdit.price = price;
//       jobEdit.proServices = proServices;
//       jobEdit.localSellers = localSellers;
//       jobEdit.onlineSellers = onlineSellers;
//       jobEdit.deliveryTime = deliveryTime;
//       jobEdit.type = type;
//       jobEdit.reviewsId = reviewsId;

//       await jobEdit.save();

//       res.status(200).send(jobEdit);
//     } else {
//       res.status(400).send("Job not found!");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Jobs.findByIdAndUpdate(id, { ...req.body }).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(err);
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

const booking = async (req, res) => {
  const _id = req.user;
  const { id } = req.params;
  try {
    let jobEdit = await Jobs.findOne({
      _id: id,
    }).exec();
    if (jobEdit) {
      jobEdit.status = false;
      jobEdit.usersBooking = _id;
      await jobEdit.save();

      // user
      const userEdit = await User.findById(_id).exec();
      userEdit.bookingJob = [...userEdit.bookingJob, id];
      userEdit.save();
      res.status(200).send(jobEdit);
    } else {
      res.status(400).send("Job not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getJobByUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate("bookingJob").exec();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const doneJob = async (req, res) => {
  const { id } = req.params;
  try {
    let jobEdit = await Jobs.findOne({
      _id: id,
    }).exec();
    if (jobEdit) {
      // user
      const idUserBooking = jobEdit.usersBooking;
      console.log("idUserBooking : ", idUserBooking);
      const userEdit = await User.findById(idUserBooking).exec();
      userEdit.bookingJob = [...userEdit.bookingJob].filter((idJob) => idJob !== id);
      await userEdit.save();
      // job
      jobEdit.status = true; // open
      jobEdit.usersBooking = null;
      await jobEdit.save();

      res.status(200).send(jobEdit);
    } else {
      res.status(400).send("Job not found!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const allList = await Jobs.find({
      name: { $regex: ".*" + name + ".*", $options: "i" },
    })
      .populate("type")
      .populate("subType")
      .exec();

    res.status(200).send(allList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadImage = async (req, res) => {
  const { files } = req;
  const { id } = req.params;
  const listUrl = files.map((file) => {
    return `${config.server.hostName}/${file.path}`;
  });

  try {
    const jobDetail = await Jobs.findOne({
      _id: id,
    }).exec();
    jobDetail.images = listUrl;
    await jobDetail.save();
    res.status(200).send(jobDetail);
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
  booking,
  getJobByUser,
  doneJob,
  getByName,
  uploadImage,
};

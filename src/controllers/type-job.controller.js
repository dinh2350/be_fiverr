const { TypeJob } = require("../models/type-job.model");
const { SubTypeJob } = require("../models/sub-type-job.model");
const { ObjectID } = require("mongoose").mongo;
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
  let listTypeJobResult = [
    {
      typeJob: {},
      listSubTypeJob: [{}, {}],
    },
    {},
    {},
  ];

  //   await SubTypeJob.aggregate([{
  //     $lookup: {
  //         from: "typeJob", // collection name in db
  //         localField: "typeJob",
  //         foreignField: "_id",
  //         as: "typeJob"
  //     }
  // }]).exec();

  let listSubTypeJob = await SubTypeJob.findById("");
  res.send(listSubTypeJob);
  console.log(listSubTypeJob);
  try {
    let typeJobList = await TypeJob.find();
    for (let index = 0; index < typeJobList.length; index++) {
      const typeJob = typeJobList[index];
      let listSubTypeJob = await SubTypeJob.find({
        where: {
          typeJobId: typeJob._id,
        },
      });
      console.log("listSubTypeJob : ", listSubTypeJob);
      listTypeJobResult = [
        ...listTypeJobResult,
        {
          typeJob,
          listSubTypeJob,
        },
      ];
    }
    res.status(200).send(listTypeJobResult);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getAll,
};

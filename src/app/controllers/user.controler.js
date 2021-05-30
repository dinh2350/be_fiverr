const { User } = require("../models/users.model");

const getAllUser = async function (req, res) {
  try {
    // Case When Success
    const userList = await User.find();
    res.status(200).send(userList);
  } catch (error) {
    // Case when error
    res.status(500).send(error);
  }
};

const getUserById = async function (req, res) {
  const { id } = req.params;

  try {
    const result = await User.findOne({
      _id: id,
    }).exec();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
};

const { User } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { config } = require("../configs");

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

const createUser = async function (req, res) {
  try {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt + password
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndUpdate(id, { ...req.body }).exec();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const byId = { _id: id };

  try {
    const deleteUser = await User.findOne(byId);
    if (deleteUser) {
      await User.deleteOne(byId);
      res.status(200).send(deleteUser);
    } else {
      res.status(404).send("Không tìm thấy user!");
    }
  } catch (error) {
    res.send(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `${config.server.hostName}/${file.path}`;
  const { user } = req;
  try {
    const userFound = await User.findOne({
      email: user.email,
    });
    userFound.avatar = urlImage;
    await userFound.save();
    res.status(200).send(userFound);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPaginationAndSearch = async (req, res) => {
  const { name, skip, limit } = req.query;
  let dkquery = {};
  if (name) {
    dkquery = {
      name: { $regex: ".*" + name + ".*", $options: "i" },
    };
  }
  console.log(dkquery);
  try {
    const userList = await User.find(dkquery, null, {
      skip: +skip,
      limit: +limit,
    }).exec();
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getPaginationAndSearch,
};

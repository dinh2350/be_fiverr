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

const createUser = async function (req, res) {
  const {
    avatar,
    first_name,
    last_name,
    email,
    phone,
    languages,
    linkAccount,
    skill,
    certification,
    role,
  } = req.body;

  try {
    const newUser = new User({
      avatar,
      first_name,
      last_name,
      email,
      phone,
      languages,
      linkAccount,
      skill,
      certification,
      role,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    avatar,
    first_name,
    last_name,
    email,
    phone,
    languages,
    linkAccount,
    skill,
    certification,
    role,
  } = req.body;

  // byID
  const byId = { _id: id };

  try {
    let userEdit = await User.findOne(byId).exec();

    if (userEdit) {
      userEdit.avatar = avatar;
      userEdit.first_name = first_name;
      userEdit.last_name = last_name;
      userEdit.email = email;
      userEdit.phone = phone;
      userEdit.languages = languages;
      userEdit.linkAccount = linkAccount;
      userEdit.skill = skill;
      userEdit.certification = certification;
      userEdit.role = role;

      await userEdit.save();
      res.status(200).send(userEdit);
    } else {
      res.status(404).send("Không tìm thấy User");
    }
  } catch (error) {
    res.status(500).send(error);
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

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

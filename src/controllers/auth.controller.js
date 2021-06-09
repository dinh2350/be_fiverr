const { User } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../configs");

const signup = async function (req, res) {
  try {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt + password
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
      role: "CLIENT",
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  // b1 : tìm ra user đang đăng nhập dựa trên trên email
  const user = await User.findOne({ email }).exec();

  if (user) {
    // b2 : kiểm mật khẩu có đúng hay không
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.credential.secretKey);
      res.status(200).send({ message: "Đăng Nhập Thành Công ! ", user, token });
    } else {
      res.status(500).send({ message: "Tài khoãng hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp" });
  }
};

module.exports = {
  signup,
  signin,
};

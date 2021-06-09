const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { config } = require("../../configs");

const verifyJwt = promisify(jwt.verify);
module.exports.authenticate = (req, res, next) => {
  const token = req.header("token");

  verifyJwt(token, config.credential.secretKey)
    .then((decoded) => {
      if (decoded) {
        req.user = decoded;
        return next();
      }
    })
    .catch(() => res.status(401).json({ message: "User is not authentecated" }));
};

// userTypeArray = ["admin", "client"]
// 1. "admin" --> "admin" = user.userType ==> next()
// 2. "client" --> "client" = user.userType = Next()
module.exports.authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;

    if (userTypeArray.findIndex((elm) => elm === user.role) > -1) return next();
    // if (userType === user.userType) return next();
    return res.status(403).json({
      message: "Bạn đã đăng nhập , nhưng không có quyền",
    });
  };
};

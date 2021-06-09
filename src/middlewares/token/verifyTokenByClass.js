const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { config } = require("../../configs");

const verifyJwt = promisify(jwt.verify);
module.exports.verifyTokenByClass = (req, res, next) => {
  const tokenByClass = req.header("tokenByClass");

  verifyJwt(tokenByClass, config.credential.secretKey)
    // verifyJwt(tokenByClass)
    .then((decoded) => {
      if (decoded) {
        req.payload = decoded;
        return next();
      }
    })
    .catch(() => res.status(401).json({ message: "Bạn đã hết hạn truy xuất api" }));
};

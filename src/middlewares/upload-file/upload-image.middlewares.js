const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImageSingle = (type) => {
  const made = mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${type}`); // setup chổ cần lưu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg", ".jpeg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("extension không hợp lệ"));
      }
    },
  });

  return upload.single(type);
};

const uploadImageMultiple = (type, amount) => {
  const made = mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${type}`); // setup chổ cần lưu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file
    },
  });
  const upload = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //   const extensionImageList = [".png", ".jpg"];
    //   const extension = file.originalname.slice(-4);
    //   const check = extensionImageList.includes(extension);
    //   if (check) {
    //     cb(null, true);
    //   } else {
    //     cb(new Error("extension không hợp lệ"));
    //   }
    // },
  });

  return upload.array(type, amount);
};

module.exports = {
  uploadImageSingle,
  uploadImageMultiple,
};

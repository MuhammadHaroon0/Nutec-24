const multer = require("multer");
const AppError = require("./AppError");

// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images/users')
//     },
//     filename: function (req, file, cb) {
//         const ext=file.mimetype.split('/')[1]
//       cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }


//   })

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload a valid image!", 400), false);
  }
};

var fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public')
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})

exports.imageMulter = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

exports.fileSMulter = multer({
  storage: fileStorage,
  fileFilter: multerFilter,
});

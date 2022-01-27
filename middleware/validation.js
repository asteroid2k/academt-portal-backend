const { errorFormatter } = require("../util/validators");
const { validationResult } = require("express-validator");
const multer = require("multer");
const { CustomError } = require("../util/errors");

// middleware for request data validation
const validateData = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map((validation) => validation.run(req)));
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  };
};

const validateImage = (req, res, next) => {
  const uploader = imageUploader("image");
  uploader(req, res, (err) => {
    if (err instanceof CustomError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      console.log(err);
      return res.status(400).json({ message: "Image Upload error" });
    }
    next();
  });
};
const validateFiles = (req, res, next) => {
  const uploader = filesUploader();
  uploader(req, res, (err) => {
    if (err instanceof CustomError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      console.log(err);
      return res.status(400).json({ message: "Image Upload error" });
    }
    next();
  });
};

// image validator config
const ACCEPTED_MIMES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
];
const fileValidator = (req, file, cb) => {
  if (!ACCEPTED_MIMES.includes(file.mimetype)) {
    return cb(
      new CustomError("Image must be jpg, jpeg or png. CV must be pdf"),
      false
    );
  }
  cb(null, true);
};

// multer instance with configuration
function imageUploader(fieldname = "image") {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: fileValidator,
    // limits: { fieldNameSize: 500000 },
  }).single(fieldname);
}
function filesUploader() {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter: fileValidator,
    // limits: { fieldNameSize: 500 },
  }).fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]);
}
module.exports = { validateData, validateImage, validateFiles };

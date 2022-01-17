const { errorFormatter } = require("../util/validators");
const { validationResult } = require("express-validator");
const multer = require("multer");

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

// multer instance with configuration
const imageUploader = (fieldname) => {
  return multer({
    storage: multer.memoryStorage,
    // fileFilter: fileValidator,
  }).single(fieldname);
};
module.exports = { validateData, imageUploader };

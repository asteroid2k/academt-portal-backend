const mongoose = require("mongoose");

const DB_VALIDATION_ERROR = mongoose.Error.ValidationError;

class CustomError {
  constructor(message, code = 400) {
    this.message = message;
    this.name = "CUSTOM";
    this.code = code;
  }
}

const handleError = (res, error, message = "Operation Unsuccessful") => {
  if (error instanceof CustomError) {
    return res.status(error.code).json({ message: error.message });
  }
  if (error instanceof DB_VALIDATION_ERROR) {
    console.error("VALIDATION ERRORS:", Object.keys(error.errors));
  }
  return res.status(400).json({ message });
};

module.exports = { DB_VALIDATION_ERROR, CustomError, handleError };

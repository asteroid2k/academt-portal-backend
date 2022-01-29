const { CustomError } = require("../util/errors");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const DatauriParser = require("datauri/parser");
const crypto = require("crypto");

const createJWT = ({ email, name }, duration = "1h") => {
  if (!(email || name)) {
    throw new CustomError("Could not authenticate");
  }
  return jwt.sign({ email, name }, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

const uploadFile = async (file) => {
  const parser = new DatauriParser();
  const ext = `.${file.mimetype.split("/")[1]}`;
  const fileStr = parser.format(ext, file.buffer);
  const upload = await cloudinary.uploader.upload(fileStr.content, {
    folder: "portal",
  });
  return upload.secure_url;
};

const genStr = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

const addMinutes = (dt, minutes) => {
  return new Date(dt.getTime() + minutes * 60000);
};

module.exports = { createJWT, uploadFile, genStr, addMinutes };

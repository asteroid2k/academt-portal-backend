const { CustomError } = require("../util/errors");
const jwt = require("jsonwebtoken");
const createJWT = ({ email, name }, duration = "1h") => {
  if (!(email || name)) {
    throw new CustomError("Could not authenticate");
  }
  return jwt.sign({ email, name }, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

module.exports = { createJWT };

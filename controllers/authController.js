const User = require("../models/User");
const { CustomError, handleError } = require("../util/errors");
const { createJWT } = require("../util/helpers");

const login = async (req, res) => {
  try {
    // get data from request
    const { email, password } = req.body;

    // check if user  exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid credentials");
    }

    // verify password
    if (!(await user.verifyPassword(password))) {
      throw new CustomError("Invalid credentials");
    }

    const token = createJWT({ email, name: user.name });
    if (!token) {
      throw new CustomError("Could not authenticate");
    }

    return res.status(200).json({ message: "Authenticated", token });
  } catch (error) {
    // handle errors
    handleError(res, error, "Authentication failed");
  }
};

module.exports = { login };

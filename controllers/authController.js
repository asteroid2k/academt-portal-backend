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

    const token = createJWT({ email, name: user.firstName });
    if (!token) {
      throw new CustomError("Could not authenticate");
    }

    return res
      .status(200)
      .json({ message: "Authenticated", token, isAdmin: user.isAdmin });
  } catch (error) {
    // handle errors
    handleError(res, error, "Authentication failed");
  }
};
const loginAdmin = async (req, res) => {
  try {
    // get data from request
    const { email, password } = req.body;

    // check if user  exists
    const user = await User.findOne({ email, isAdmin: true });
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

    return res
      .status(200)
      .json({ message: "Authenticated", token, isAdmin: user.isAdmin });
  } catch (error) {
    handleError(res, error, "Authentication failed");
  }
};

// register
const register = async (req, res) => {
  try {
    // get data from request
    const { firstName, lastName, email, phone, password } = req.body;
    // check if user with email already exists
    if (await User.exists({ email })) {
      throw new CustomError("Email is taken");
    }
    // check if user with phone already exists
    if (await User.exists({ phone })) {
      throw new CustomError("Phone is taken");
    }
    // create user with request data
    const newUser = new User({ firstName, lastName, email, phone, password });
    // upload image
    // if (req.file) {
    // }
    //  schema validation
    await newUser.validate();

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Account created", user_id: newUser.id });
  } catch (error) {
    handleError(res, error, "Registration failed");
  }
};

module.exports = { login, register, loginAdmin };

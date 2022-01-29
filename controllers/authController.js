const User = require("../models/User");
const Code = require("../models/Code");
const { CustomError, handleError } = require("../util/errors");
const { createJWT, genStr, addMinutes } = require("../util/helpers");
const { sendMail } = require("../config/mailer");

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
    await newUser.hashPassword();
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Account created", user_id: newUser.id });
  } catch (error) {
    handleError(res, error, "Registration failed");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User with this email not found");
    }
    const code = genStr(24);
    const expire_at = addMinutes(new Date(), 60);
    await Code.create({ code, identifier: email, expire_at });

    sendMail("forgot", user, code);
    res.status(200).json({ message: "Password reset mail sent" });
  } catch (error) {
    handleError(res, error, "Password reset failed");
  }
};

// Reset user password using params from reset link
const resetPassword = async (req, res) => {
  const { password, email, code } = req.body;

  try {
    // verify reset code
    let resetCode = await Code.findOne({ code });

    if (!resetCode) {
      return res.status(404).json({ message: "Invalid reset code" });
    }

    // verify user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }

    // check if it's expired
    if (new Date(resetCode.expire_at) < new Date()) {
      return res.status(400).json({ message: "Expired link" });
    }

    //reset user's password
    user.password = password;
    await user.hashPassword();
    user.save();

    res.status(200).json({ message: "Password reset" });
  } catch (error) {
    handleError(res, error, "Password reset failed");
  }
};

module.exports = { login, register, loginAdmin, forgotPassword, resetPassword };

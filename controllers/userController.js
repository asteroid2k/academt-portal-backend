const User = require("../models/User");
const { CustomError, handleError } = require("../util/errors");

const getUserDetails = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new CustomError("Authentication failed");
    }
    res.status(200).json({ user });
  } catch (error) {
    handleError(res, error, "Could not fetch user");
  }
};

const editDetails = async (req, res) => {
  try {
    const user = req.user;
    const { firstName, lastName, email, phone, country, address } = req.body;

    if (email && email !== user.email && (await User.exists({ email }))) {
      throw new CustomError("Email is taken");
    }
    if (phone && phone !== user.phone && (await User.exists({ phone }))) {
      throw new CustomError("Phone is taken");
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.country = country || user.country;
    user.address = address || user.address;
    if (req.file) {
      console.log(req.file);
    }
    await user.validate();
    await user.save();
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    handleError(res, error, "Could not fetch user");
  }
};

module.exports = { getUserDetails, editDetails };

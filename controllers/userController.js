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

module.exports = { getUserDetails };

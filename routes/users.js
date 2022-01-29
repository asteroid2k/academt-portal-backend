const express = require("express");
const {
  getUserDetails,
  editDetails,
} = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const { validateData, validateImage } = require("../middleware/validation");
const { editProfileValidator } = require("../util/validators");

const userRouter = express.Router();
const userRouters = express.Router();

userRouter.use(verifyToken);
userRouter.get("/", getUserDetails);
userRouter.patch(
  "/",
  verifyAdmin,
  validateImage,
  validateData(editProfileValidator),
  editDetails
);

module.exports = { userRouter, userRouters };

const express = require("express");
const { getUserDetails } = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

const userRouter = express.Router();
const userRouters = express.Router();

userRouter.use(verifyToken);
userRouter.get("/", verifyToken, getUserDetails);

module.exports = { userRouter, userRouters };

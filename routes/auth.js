const { Router } = require("express");
const {
  login,
  register,
  loginAdmin,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { validateData } = require("../middleware/validation");
const {
  loginValidator,
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../util/validators");

const authRouter = Router();

authRouter.post("/signin", validateData(loginValidator), login);
authRouter.post("/admin/signin", validateData(loginValidator), loginAdmin);
authRouter.post("/signup", validateData(registerValidator), register);
authRouter.post(
  "/forgot",
  validateData(forgotPasswordValidator),
  forgotPassword
);
authRouter.post("/reset", validateData(resetPasswordValidator), resetPassword);
module.exports = authRouter;

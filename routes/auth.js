const { Router } = require("express");
const { login, register } = require("../controllers/authController");
const { validateData } = require("../middleware/validation");
const { loginValidator, registerValidator } = require("../util/validators");

const authRouter = Router();

authRouter.post("/signin", validateData(loginValidator), login);
authRouter.post("/signup", validateData(registerValidator), register);
module.exports = authRouter;

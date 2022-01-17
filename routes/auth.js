const { Router } = require("express");
const { login } = require("../controllers/authController");
const { validateData } = require("../middleware/validation");
const { loginValidator } = require("../util/validators");

const authRouter = Router();

authRouter.post("/signin", validateData(loginValidator), login);
authRouter.post("/signup", (req, res) => {
  res.send("signup");
});
module.exports = authRouter;

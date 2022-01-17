const { Router } = require("express");

const authRouter = Router();
authRouter.use("/signin", (req, res) => {
  res.send("signin");
});
authRouter.use("/signup", (req, res) => {
  res.send("signup");
});
module.exports = authRouter;

const { Router } = require("express");
const authRouter = require("../routes/auth");

const router = Router();

router.get("/", (req, res) => {
  res.send("Portal🚀");
});

router.use("/auth", authRouter);

module.exports = router;

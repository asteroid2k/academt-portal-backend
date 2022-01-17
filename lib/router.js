const { Router } = require("express");
const authRouter = require("../routes/auth");
const batchRouter = require("../routes/batch");

const router = Router();

router.get("/", (req, res) => {
  res.send("Portal🚀");
});
// Auth routes
// login ,register
router.use("/auth", authRouter);
// Batch routes
router.use("/batch", batchRouter);

module.exports = router;

const { Router } = require("express");
const authRouter = require("../routes/auth");
const batchRouter = require("../routes/batch");
const assessRouter = require("../routes/assessment");
const applicationRouter = require("../routes/application");
const { userRouter } = require("../routes/users");

const router = Router();

router.get("/", (req, res) => {
  res.send("Portal🚀");
});
// Auth routes
// login ,register
router.use("/auth", authRouter);
router.use("/applications", applicationRouter);

// Batch routes
router.use("/batch", batchRouter);
// Assessment routes
router.use("/assessment", assessRouter);
// User routes
router.use("/user", userRouter);

module.exports = router;

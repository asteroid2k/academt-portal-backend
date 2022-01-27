const { Router } = require("express");
const {
  submitApplication,
  getApplications,
  getUserApplication,
} = require("../controllers/applicationController");
const { validateData, validateFiles } = require("../middleware/validation");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const {
  submitApplicationValidator,
  idValidator,
} = require("../util/validators");

const applicationRouter = Router();

applicationRouter.get("/", verifyToken, verifyAdmin, getApplications);
applicationRouter.get("/user", verifyToken, getUserApplication);

// create a batch
applicationRouter.post(
  "/apply/:id",
  verifyToken,
  validateFiles,
  validateData(idValidator),
  validateData(submitApplicationValidator),
  submitApplication
);

module.exports = applicationRouter;

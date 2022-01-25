const { Router } = require("express");
const { submitApplication } = require("../controllers/applicationController");
const { validateData } = require("../middleware/validation");
const { verifyToken } = require("../middleware/auth");
const {
  submitApplicationValidator,
  idValidator,
} = require("../util/validators");
const { imageUploader } = require("../middleware/validation");

const applicationRouter = Router();

// create a batch
applicationRouter.post(
  "/apply/:id",
  verifyToken,
  imageUploader("image"),
  validateData(idValidator),
  validateData(submitApplicationValidator),
  submitApplication
);

module.exports = applicationRouter;

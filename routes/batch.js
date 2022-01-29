const { Router } = require("express");
const { createBatch, getBatches } = require("../controllers/batchController");
const { validateData, validateImage } = require("../middleware/validation");
const { createBatchValidator } = require("../util/validators");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const batchRouter = Router();

// get all batches
batchRouter.get("/", getBatches);

// create a batch
batchRouter.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateImage,
  validateData(createBatchValidator),
  createBatch
);

module.exports = batchRouter;

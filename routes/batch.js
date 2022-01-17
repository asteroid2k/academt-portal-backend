const { Router } = require("express");
const { createBatch, getBatches } = require("../controllers/batchController");
const { validateData } = require("../middleware/validation");
const { createBatchValidator } = require("../util/validators");
const { imageUploader } = require("../middleware/validation");

const batchRouter = Router();

// get all batches
batchRouter.get("/", getBatches);

// create a batch
batchRouter.post(
  "/",
  imageUploader("image"),
  validateData(createBatchValidator),
  createBatch
);

module.exports = batchRouter;

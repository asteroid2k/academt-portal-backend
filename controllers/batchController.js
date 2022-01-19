const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");

const getBatches = async (req, res) => {
  const today = new Date().toISOString();
  try {
    const { ongoing } = req.query;
    if (ongoing === "true") {
      const batches = await Batch.find().where("closure_date").gt(today);
      return res.status(200).json({ count: batches.length, batches });
    }

    const batches = await Batch.find();

    res.status(200).json({ count: batches.length, batches, ongoing });
  } catch (error) {
    // handle errors
    handleError(res, error, "Authentication failed");
  }
};

const createBatch = async (req, res) => {
  try {
    // get data from request
    const { name, slug, closure_date, isClosed, instructions } = req.body;

    // check if user  exists
    const batch = await Batch.exists({ slug });
    if (batch) {
      throw new CustomError("Batch with Id/Slug already exists");
    }

    const newBatch = new Batch({
      name,
      slug,
      closure_date,
      isClosed,
      instructions,
    });
    // validate document before saving
    await newBatch.validate();
    newBatch.save();

    return res
      .status(201)
      .json({ message: "Batch created", batch_id: newBatch.id });
  } catch (error) {
    handleError(res, error, "Authentication failed");
  }
};

module.exports = { createBatch, getBatches };

const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");
const { uploadFile } = require("../util/helpers");

const getBatches = async (req, res) => {
  const today = new Date().toISOString();
  try {
    const { ongoing } = req.query;
    if (ongoing === "true") {
      const batches = await Batch.find().where("closure_date").gt(today);
      return res.status(200).json({ count: batches.length, batches });
    }

    const batches = await Batch.find();
    batches.forEach((batch) => {
      if (batch.closure_date < today) {
        console.log("close");
        batch.isClosed = true;
        batch.save();
      }
    });

    res.status(200).json({ count: batches.length, batches, ongoing });
  } catch (error) {
    // handle errors
    handleError(res, error, "Could not fetch batches");
  }
};

const createBatch = async (req, res) => {
  try {
    // get data from request
    const { slug, closure_date, isClosed, instructions } = req.body;

    // check for ongoing batch
    if (
      await Batch.findOne().where("closure_date").gt(new Date().toISOString())
    ) {
      throw new CustomError("There is an ongoing batch/application");
    }

    // check if user  exists
    if (await Batch.exists({ slug })) {
      throw new CustomError("Batch with Id/Slug already exists");
    }

    const newBatch = new Batch({
      // name,
      slug,
      closure_date,
      isClosed,
      instructions,
    });
    // validate document before saving
    await newBatch.validate();
    if (req.file) {
      console.log(req.file);
      if (req.file.size > 500000) {
        throw new CustomError("File too large");
      }

      newBatch.image = await uploadFile(req.file);
    }

    newBatch.save();
    return res
      .status(201)
      .json({ message: "Batch created", batch_id: newBatch.id });
  } catch (error) {
    handleError(res, error, "Could not create batch");
  }
};

module.exports = { createBatch, getBatches };

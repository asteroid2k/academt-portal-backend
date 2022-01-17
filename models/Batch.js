const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  closure_date: { type: String, required: true },
  isClosed: { type: Boolean, default: false },
  image: String,
  instructions: String,
});

// HOOKS
batchSchema.methods.validateDate = async function () {
  if (new Date(this.closure_date) < new Date()) {
    this.isClosed = true;
  }
};

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;

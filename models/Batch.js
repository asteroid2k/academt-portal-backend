const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String, required: true },
  closure_date: { type: Date, required: true },
  isClosed: { type: Boolean, default: false },
  image: String,
  image_id: String,
  instructions: String,
  app_count: { type: Number, default: 0 },
  started_at: { type: Date, default: new Date(Date.now()).toISOString() },
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;

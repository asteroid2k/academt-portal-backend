const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId },
  batch_id: { type: mongoose.SchemaTypes.ObjectId },
  DOB: { type: String, required: true },
  course: { type: String, required: true },
  address: { type: String, required: true },
  gpa: { type: String, required: true },
  university: { type: String, required: true },
});

export const Application = mongoose.model("Application", applicationSchema);

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  batch_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  batch_slug: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  gpa: { type: String, required: true },
  age: { type: Number },
  university: { type: String, required: true },
  isApproved: { type: String, default: "pending" },
  cv: String,
  image: String,
  created_at: { type: String, default: new Date().toISOString() },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;

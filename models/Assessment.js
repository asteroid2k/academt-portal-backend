const mongoose = require("mongoose");
const { questionSchema, answerSchema } = require("./Question");

const assessmentSchema = new mongoose.Schema({
  batch_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    unique: true,
    ref: "Batch",
  },
  slug: { type: String },
  questions: { type: [questionSchema], required: true },
  answers: { type: [answerSchema], required: true },
  time_allocated: { type: Number, default: 30 },
  status: { type: String, default: "ongoing" },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;

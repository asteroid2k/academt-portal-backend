const mongoose = require("mongoose");
const { questionSchema, answerSchema } = require("./Question");

const assessmentSchema = new mongoose.Schema({
  batch_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  answers: { type: [answerSchema], required: true },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;

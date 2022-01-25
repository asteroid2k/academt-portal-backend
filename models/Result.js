const mongoose = require("mongoose");
const { answerSchema } = require("./Question");

const resultSchema = new mongoose.Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  batch_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
  score: { type: Number, required: true },
  answers: { type: [answerSchema], required: true },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  image: String,
  question: { type: String, required: true },
  options: { type: [{ opt: String, value: String }], required: true },
});

const answerSchema = new mongoose.Schema({
  num: { type: Number, required: true },
  answer: { type: String, required: true, enum: ["A", "B", "C", "D"] },
});

// const Question = mongoose.model("Question", questionSchema);

module.exports = { questionSchema, answerSchema };

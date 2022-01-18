const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  image: String,
  question: { type: String, required: true },
  options: { type: [{ opt: String, value: String }], required: true },
  correct: String,
});

// const Question = mongoose.model("Question", questionSchema);

module.exports = questionSchema;

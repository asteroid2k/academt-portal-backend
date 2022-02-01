const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: String,
  expire_at: {
    type: Date,
    default: new Date(Date.now() + 10 * 60000).toISOString(),
  },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  identifier: String,
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;

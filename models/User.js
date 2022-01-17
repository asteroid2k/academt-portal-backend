const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  isAdmin: { type: Boolean, default: false, immutable: true },
  password: { type: String, required: true },
});

// HOOKS

// add salt and hash password before saving user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  country: { type: String },
  address: { type: String },
  isAdmin: { type: Boolean, default: false, immutable: true },
  password: { type: String, required: true },
  image: String,
  image_id: String,
  updates: [
    {
      text: String,
      created_at: {
        type: Date,
        default: new Date(Date.now()).toISOString(),
      },
    },
  ],
});

// HOOKS

// add salt and hash password
userSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
};
userSchema.methods.verifyPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

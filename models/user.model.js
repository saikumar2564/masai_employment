const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    Email: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };

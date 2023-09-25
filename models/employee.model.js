const mongoose = require("mongoose");
require("dotenv").config();

const empSchema = mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Department: {
      type: String,
      enum: ["Tech", "Marketing", "Operations"],
      required: true,
    },
    Salary: { type: Number, required: true },
    creator: { type: String, required: true },
  },
  { versionKey: false }
);

const EmpModel = mongoose.model("Employee", empSchema);

module.exports = { EmpModel };

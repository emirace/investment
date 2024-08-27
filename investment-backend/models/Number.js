const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Number", numberSchema);

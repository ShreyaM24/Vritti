const mongoose = require("mongoose");

const phq9Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: { type: [Number], required: true },
    totalScore: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phq9", phq9Schema);

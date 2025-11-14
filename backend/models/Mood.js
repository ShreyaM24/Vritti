const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔑
    mood: String,
    habits: [String],
    sleep: String,
    energy: String,
    affirmations: [String],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", MoodSchema);

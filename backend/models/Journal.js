const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔑 linked to user
    mood: { type: String, default: "neutral" },
    content: { type: String, required: true },
    activities: [String],
    goals: [String],
    date: { type: String }, // keep string if you want formatted date
    time: { type: String }, // keep string if you want formatted time
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", JournalSchema);

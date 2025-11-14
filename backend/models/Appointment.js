const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  counsellor: { type: mongoose.Schema.Types.ObjectId, ref: "Counsellor", required: true },
  mode: { type: String, enum: ["chat", "call", "video", "offline"], required: true },
  date: { type: String }, // set by admin
  time: { type: String }, // set by admin
  status: { type: String, enum: ["pending", "scheduled", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);

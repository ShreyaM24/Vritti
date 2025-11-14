const mongoose = require("mongoose");

const counsellorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, default: "counsellor" }, // ✅ added
});

module.exports = mongoose.model("Counsellor", counsellorSchema);

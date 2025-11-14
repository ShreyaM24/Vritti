const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Counsellor = require("../models/Counsellor");
const { verifyTokenMiddleware, adminOnly } = require("../utils/auth");

// Student books an appointment
router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    console.log("📩 Incoming body:", req.body);
    console.log("👤 Authenticated user:", req.user);

    const { counsellor, mode } = req.body;

    if (!counsellor || !mode) {
      return res.status(400).json({ error: "Counsellor and mode are required" });
    }

    const appointment = new Appointment({
      student: req.user._id, // student comes from token
      counsellor,            // counsellor ObjectId (from Counsellor model)
      mode,
      status: "pending",     // default
    });

    await appointment.save();
    const populated = await appointment.populate("counsellor", "name specialization");

    console.log("✅ Appointment saved:", populated);

    res.status(201).json(populated);
  } catch (err) {
    console.error("❌ Create appointment error:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Student fetches their own appointments
router.get("/my", verifyTokenMiddleware, async (req, res) => {
  try {
    const appts = await Appointment.find({ student: req.user._id })
      .populate("counsellor", "name specialization");
    res.json(appts);
  } catch (err) {
    console.error("❌ Fetch my appointments error:", err);
    res.status(500).json({ error: "Failed to fetch my appointments" });
  }
});

// Counsellor fetches their own scheduled/pending appointments
router.get("/counsellor", verifyTokenMiddleware, async (req, res) => {
  try {
    // 👉 Map logged-in User to Counsellor document using email
    const counsellorDoc = await Counsellor.findOne({ email: req.user.email });
    if (!counsellorDoc) {
      return res.status(403).json({ error: "Not authorized as counsellor" });
    }

    const appts = await Appointment.find({
      counsellor: counsellorDoc._id,
      status: { $in: ["pending", "scheduled"] }, // include both
    })
      .populate("student", "username email")
      .populate("counsellor", "name specialization");

    res.json(appts);
  } catch (err) {
    console.error("❌ Fetch counsellor appointments error:", err);
    res.status(500).json({ error: "Failed to fetch counsellor appointments" });
  }
});

// Admin fetches all appointments
router.get("/", verifyTokenMiddleware, adminOnly, async (req, res) => {
  try {
    const appts = await Appointment.find()
      .populate("student", "username email")
      .populate("counsellor", "name specialization");
    res.json(appts);
  } catch (err) {
    console.error("❌ Fetch all appointments error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Admin updates an appointment (assigns date/time/status)
router.put("/:id", verifyTokenMiddleware, adminOnly, async (req, res) => {
  try {
    const { date, time, status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, status },
      { new: true }
    )
      .populate("student", "username email")
      .populate("counsellor", "name specialization");

    res.json(updated);
  } catch (err) {
    console.error("❌ Update appointment error:", err);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Delete appointment (student or admin)
router.delete("/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Student can delete only their own appointment
    if (req.user.role === "student" && appt.student.toString() !== req.user._id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Counsellors can't delete (only student/admin)
    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("❌ Delete appointment error:", err);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

module.exports = router;

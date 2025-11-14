// routes/counsellor.js
const express = require("express");
const Counsellor = require("../models/Counsellor");
const { verifyTokenMiddleware } = require("../utils/auth");

const router = express.Router();

// ✅ Get all counsellors (for students to see)
router.get("/", async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.json(counsellors);
  } catch (err) {
    console.error("❌ Error fetching counsellors:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Already existing route: get logged-in counsellor profile
router.get("/me", verifyTokenMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "counsellor") {
      return res
        .status(403)
        .json({ error: "Only counsellors can access this route" });
    }

    // Data is already in token now
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    console.error("❌ Error fetching counsellor profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const { verifyTokenMiddleware } = require("../utils/auth");

// POST /api/mood → save a new entry
router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const { mood, habits, sleep, energy, affirmations } = req.body;

    const entry = new Mood({
      user: req.user.id, // ✅ only this user
      mood,
      habits,
      sleep,
      energy,
      affirmations,
      date: new Date(),
    });

    await entry.save();
    res.json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/mood → fetch this user’s entries
router.get("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const entries = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

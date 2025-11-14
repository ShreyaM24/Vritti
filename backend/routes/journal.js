const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");
const { verifyTokenMiddleware } = require("../utils/auth");

// 📌 Create new journal entry
router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const { mood, content, activities, goals, date, time } = req.body;

    const entry = new Journal({
      user: req.user.id,
      mood,
      content,
      activities,
      goals,
      date,
      time,
    });

    await entry.save();
    res.status(201).json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📌 Get all journals for this user
router.get("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📌 Update a journal entry
router.put("/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const updated = await Journal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // ✅ only update if owned by user
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: "Entry not found" });
    }

    res.json({ success: true, entry: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📌 Delete a journal entry
router.delete("/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Entry not found" });
    }

    res.json({ success: true, message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

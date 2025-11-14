// routes/phq-9.js
const express = require("express");
const router = express.Router();
const { verifyTokenMiddleware } = require("../utils/auth");
const Phq9 = require("../models/Phq9");

// 🔹 Helper: classify severity by PHQ-9 score
function classifySeverity(score) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately Severe";
  return "Severe";
}

// Save PHQ-9 assessment
router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const { answers, totalScore } = req.body;

    const newAssessment = new Phq9({
      user: req.user.id,
      answers,
      totalScore,
    });

    await newAssessment.save();
    res.status(201).json({ message: "Assessment saved", newAssessment });
  } catch (error) {
    console.error("❌ Error saving PHQ-9:", error);
    res.status(500).json({ error: "Failed to save assessment" });
  }
});

// ✅ Get only current user's assessments
router.get("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const assessments = await Phq9.find({ user: req.user.id }).sort({
      createdAt: 1,
    });
    res.json(assessments);
  } catch (error) {
    console.error("❌ Error fetching PHQ-9:", error);
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

router.get("/stats", verifyTokenMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "counsellor") {
      return res.status(403).json({ error: "Access denied" });
    }

    const results = await Phq9.find();

    const severityCounts = {
      Minimal: 0,
      Mild: 0,
      Moderate: 0,
      "Moderately Severe": 0,
      Severe: 0,
    };

    results.forEach((r) => {
      let level = "Minimal";
      if (r.totalScore <= 4) level = "Minimal";
      else if (r.totalScore <= 9) level = "Mild";
      else if (r.totalScore <= 14) level = "Moderate";
      else if (r.totalScore <= 19) level = "Moderately Severe";
      else level = "Severe";

      severityCounts[level]++;
    });

    const total = results.length || 1;
    const stats = Object.keys(severityCounts).map((key) => ({
      name: key,
      value: severityCounts[key],
      percent: ((severityCounts[key] / total) * 100).toFixed(1),
    }));

    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching PHQ-9 stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// routes/phq-9.js
router.get("/stats", verifyTokenMiddleware, async (req, res) => {
  try {
    // only admin can see all stats
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const results = await Phq9.find();

    const severityCounts = {
      Minimal: 0,
      Mild: 0,
      Moderate: 0,
      "Moderately Severe": 0,
      Severe: 0,
    };

    results.forEach((r) => {
      let level = "Minimal";
      if (r.totalScore <= 4) level = "Minimal";
      else if (r.totalScore <= 9) level = "Mild";
      else if (r.totalScore <= 14) level = "Moderate";
      else if (r.totalScore <= 19) level = "Moderately Severe";
      else level = "Severe";

      severityCounts[level]++;
    });

    const total = results.length || 1;
    const stats = Object.keys(severityCounts).map((key) => ({
      name: key,
      value: severityCounts[key],
      percent: ((severityCounts[key] / total) * 100).toFixed(1),
    }));

    res.json(stats);
  } catch (err) {
    console.error("❌ Error fetching PHQ-9 stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});


module.exports = router;

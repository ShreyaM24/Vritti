const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, verifyTokenMiddleware } = require('../utils/auth');

router.post('/register', async (req, res) => {
  const { name, email, password, role, language } = req.body;

  console.log("📩 Incoming register request:", req.body);

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: role === 'student' ? undefined : email,
      passwordHash: hash,
      role,
      language,
    });
    await user.save();
    console.log("✅ User saved:", user);

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email || null,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post("/login", async (req, res) => {
  console.log("📥 Login request body:", req.body);
  const { email, username, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  let user;
  if (username) {
    user = await User.findOne({ name: username, role: "student" });
  } else if (email) {
    user = await User.findOne({ email });
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email || null, role: user.role },
  });
});

router.get("/me", verifyTokenMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error in /me:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
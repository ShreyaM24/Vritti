const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { verifyTokenMiddleware } = require("../utils/auth");

/** 📌 Get all posts */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

/** 📌 Create new post */
router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const post = new Post({
      user: req.user.id,
      avatar: req.user.avatar || "🙂",
      role: req.user.role, // ✅ store role from logged-in user
      text: req.body.text,
      date: new Date(),
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

/** 📌 Like / Dislike */
router.post("/:id/react", verifyTokenMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (req.body.reaction === "like") post.likes++;
    if (req.body.reaction === "dislike") post.dislikes++;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to react" });
  }
});

/** 📌 Reply */
router.post("/:id/reply", verifyTokenMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.replies.push({
      user: req.user.id,
      avatar: req.user.avatar || "🙂",
      role: req.user.role, // ✅ include role in replies too
      text: req.body.text,
      date: new Date(),
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to reply" });
  }
});

/** 📌 Report */
router.post("/:id/report", verifyTokenMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.reportCount++;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to report post" });
  }
});

/** 📌 Delete */
router.delete("/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (req.user.role !== "admin" && post.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;

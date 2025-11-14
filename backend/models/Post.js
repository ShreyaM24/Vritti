const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  avatar: { type: String, default: "🙂" },
  text: String,
  date: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  avatar: { type: String, default: "🙂" },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
  replies: [replySchema],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);

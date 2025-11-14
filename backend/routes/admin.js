const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Post = require('../models/Post');
const Resource = require('../models/Resource');
const User = require('../models/User');
const { verifyTokenMiddleware, adminOnly } = require('../utils/auth');

router.get('/overview', verifyTokenMiddleware, adminOnly, async (req,res)=>{
  const users = await User.countDocuments();
  const bookings = await Booking.countDocuments();
  const resources = await Resource.countDocuments();
  const posts = await Post.countDocuments();
  const sevenDays = new Date(); sevenDays.setDate(sevenDays.getDate()-7);
  const recentBookings = await Booking.countDocuments({ createdAt: { $gte: sevenDays }});
  res.json({ users, bookings, resources, posts, recentBookings });
});

router.get('/flagged-posts', verifyTokenMiddleware, adminOnly, async (req,res)=>{
  const flagged = await Post.find({ flagged: true }).populate('author','name email');
  const anon = flagged.map(p => ({ id: p._id, content: p.content, createdAt: p.createdAt }));
  res.json(anon);
});

module.exports = router;

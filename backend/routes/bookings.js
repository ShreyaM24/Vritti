const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { verifyTokenMiddleware } = require('../utils/auth');

router.post('/', verifyTokenMiddleware, async (req,res)=>{
  const { startTime, endTime, counsellorId, channel, confidentialNotes } = req.body;
  try {
    const booking = await Booking.create({
      student: req.user.id,
      counsellor: counsellorId,
      startTime,
      endTime,
      channel,
      confidentialNotes
    });
    return res.json(booking);
  } catch (err) { console.error(err); return res.status(500).json({ message: 'Server error' }); }
});

router.get('/mine', verifyTokenMiddleware, async (req,res)=>{
  const list = await Booking.find({ student: req.user.id }).populate('counsellor','name email');
  res.json(list);
});

router.get('/assigned', verifyTokenMiddleware, async (req,res)=>{
  const list = await Booking.find({ counsellor: req.user.id }).populate('student','name email');
  res.json(list);
});

router.patch('/:id/status', verifyTokenMiddleware, async (req,res)=>{
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Not found' });
  booking.status = status;
  await booking.save();
  res.json(booking);
});

module.exports = router;

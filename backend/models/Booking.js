const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  counsellor: { type: Schema.Types.ObjectId, ref: 'User' },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  channel: { type: String, enum: ['in-person','online','phone'], default: 'online' },
  status: { type: String, enum: ['pending','confirmed','cancelled','completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  confidentialNotes: { type: String }
});

module.exports = mongoose.model('Booking', BookingSchema);

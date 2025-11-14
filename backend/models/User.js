const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['student','counsellor','volunteer','admin'], default: 'student' },
  language: { type: String, default: 'en' },
  trainedVolunteer: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

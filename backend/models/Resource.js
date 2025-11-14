const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['video','audio','guide','article'], default: 'guide' },
  language: { type: String, default: 'en' },
  url: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);

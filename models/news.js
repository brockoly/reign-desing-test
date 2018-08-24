const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({
  created_at: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String, required: true },
  objectID: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
}, {
  collection: 'news',
  timestamps: true,
});

module.exports = mongoose.model('news', newsSchema);
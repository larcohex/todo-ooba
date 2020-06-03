const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
  group: String,
});

module.exports = mongoose.model('Task', taskSchema);

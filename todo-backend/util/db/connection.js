const mongoose = require('mongoose');
const dbConfig = require('../../config/db');

mongoose.connect(dbConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = mongoose.connection;

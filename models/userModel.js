const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    id: String,
    newcomer: { type: Boolean, default: true }
  }
);

module.exports = mongoose.model('User', userModel);
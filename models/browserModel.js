const mongoose = require('mongoose');

const { Schema } = mongoose;

const browserModel = new Schema(
  {
    name: { type: String, default: "" },
    countviews: { type: Number, default: 1 }
  }
);

module.exports = mongoose.model('Browser', browserModel);
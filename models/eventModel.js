const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventModel = new Schema(
  {
    "pageid": { type: String, default: "" },
    "userid": { type: String, default: "" },
    timestamp: { type: Number, default: 0 }
  }
);

module.exports = mongoose.model('Event', eventModel);
const mongoose = require('mongoose');

const { Schema } = mongoose;

const countryModel = new Schema(
  {
    code: String,
    countviews: { type: Number, default: 1 }
  }
);

module.exports = mongoose.model('Country', countryModel);
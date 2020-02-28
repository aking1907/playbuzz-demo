const mongoose = require('mongoose');

const { Schema } = mongoose;

const pageViewModel = new Schema(
  {
    pageid: String,
    countviews: {type:Number, default:1}
  }
);

module.exports = mongoose.model('Pageview', pageViewModel);
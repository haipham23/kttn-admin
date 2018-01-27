const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const shortid = require('shortid');


const ChapterSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: [true, 'Missing Title']
  },
  quote: {
    type: String,
    required: [true, 'Missing Quote']
  },
  prayer: {
    type: String,
    required: [true, 'Missing Prayer']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});


ChapterSchema.plugin(timestamps);

module.exports = mongoose.model('Chapter', ChapterSchema);

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const shortid = require('shortid');


const QuestionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  content: {
    type: String,
    required: [true, 'Missing Content']
  },
  answers: {
    type: Array,
    required: [true, 'Missing Answers']
  },
  result: {
    type: Number,
    required: [true, 'Missing Result']
  },
  chapter: {
    type: String,
    required: [true, 'Missing Chapter']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

QuestionSchema.plugin(timestamps);

module.exports = mongoose.model('Question', QuestionSchema);

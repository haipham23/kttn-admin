const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');


const QuestionSchema = new mongoose.Schema({
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
    type: Number,
    required: [true, 'Missing Chapter']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

QuestionSchema.plugin(timestamps);

module.exports = mongoose.model('Question', QuestionSchema);

const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);

const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Missing Content']
  },
  questionId: {
    type: String,
    required: [true, 'Missing Question ID']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', AnswerSchema);

const QuestionService = require('../services/question.service');


const index = (req, res) =>
  QuestionService.fetchAll()
    .then(data => res.render('pages/index', { data: JSON.stringify(data) }));

const newQuestion = (req, res) => res.render('pages/new-question');

const editQuestion = (req, res) =>
  QuestionService.find(req.params)
    .then(doc => res.render('pages/edit-question', { doc: JSON.stringify(doc) }))
    .catch(() => res.render('pages/new-question'));


const PageController = {
  index,
  newQuestion,
  editQuestion
};

module.exports = PageController;

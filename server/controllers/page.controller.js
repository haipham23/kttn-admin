const QuestionService = require('../services/question.service');
const ChapterService = require('../services/chapter.service');


const allQuestions = (req, res) =>
  QuestionService.fetchByChapterId(req.params)
    .then(data => res.render('pages/questions', { data: JSON.stringify(data) }));

const newQuestion = (req, res) => res.render('pages/new-question');

const editQuestion = (req, res) =>
  QuestionService.find(req.params)
    .then(doc => res.render('pages/edit-question', { doc: JSON.stringify(doc) }))
    .catch(() => res.render('pages/new-question'));


const allChapters = (req, res) =>
  ChapterService.fetchAll()
    .then(data => res.render('pages/chapters', { data: JSON.stringify(data) }));

const newChapter = (req, res) => res.render('pages/new-chapter');

const editChapter = (req, res) =>
  ChapterService.find(req.params)
    .then(doc => res.render('pages/edit-chapter', { doc: JSON.stringify(doc) }))
    .catch(() => res.render('pages/new-chapter'));


const PageController = {
  allQuestions,
  newQuestion,
  editQuestion,
  allChapters,
  newChapter,
  editChapter
};

module.exports = PageController;

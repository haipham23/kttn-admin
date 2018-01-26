const QuestionService = require('../services/question.service');
const ChapterService = require('../services/chapter.service');


const toString = obj => JSON.stringify(obj);

const allQuestions = (req, res) =>
  QuestionService.fetchByChapterId(req.params)
    .then(questions => res.render('pages/questions', { questions: toString(questions) }));

const newQuestion = (req, res) =>
  ChapterService.fetchAll()
    .then(chapters => res.render('pages/new-question', { chapters: toString(chapters) }))
    .catch(() => res.render('pages/home'));

const editQuestion = (req, res) =>
  Promise.all([
    QuestionService.find(req.params),
    ChapterService.fetchAll()
  ])
    .then(results =>
      res.render('pages/edit-question', {
        chapters: toString(results[1]),
        question: toString(results[0])
      }))
    .catch(() => res.render('pages/home'));


const allChapters = (req, res) =>
  ChapterService.fetchAll()
    .then(data => res.render('pages/chapters', { data: toString(data) }));

const newChapter = (req, res) => res.render('pages/new-chapter');

const editChapter = (req, res) =>
  ChapterService.find(req.params)
    .then(doc => res.render('pages/edit-chapter', { doc: toString(doc) }))
    .catch(() => res.render('pages/new-chapter'));

const home = (req, res) => res.render('pages/home');
const toHome = (req, res) => res.redirect('/');

const PageController = {
  home,
  toHome,
  allQuestions,
  newQuestion,
  editQuestion,
  allChapters,
  newChapter,
  editChapter
};

module.exports = PageController;

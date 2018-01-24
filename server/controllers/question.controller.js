const QuestionService = require('../services/question.service');
const ResponseFactory = require('../factories/response.factory');


const create = (req, res) =>
  ResponseFactory.ok(QuestionService.create, req.body, req, res);

const fetch = (req, res) =>
  ResponseFactory.withDocs(QuestionService.fetch, req.query, req, res);

const update = (req, res) =>
  ResponseFactory.ok(QuestionService.update, req.body, req, res);

const toggle = (req, res) =>
  ResponseFactory.ok(QuestionService.toggle, req.body, req, res);

const remove = (req, res) =>
  ResponseFactory.ok(QuestionService.remove, req.body, req, res);


const QuestionController = {
  create,
  fetch,
  update,
  toggle,
  remove
};

module.exports = QuestionController;

const ChapterService = require('../services/chapter.service');
const ResponseFactory = require('../factories/response.factory');


const create = (req, res) =>
  ResponseFactory.ok(ChapterService.create, req.body, req, res);

const update = (req, res) =>
  ResponseFactory.ok(ChapterService.update, req.body, req, res);

const remove = (req, res) =>
  ResponseFactory.ok(ChapterService.remove, req.params, req, res);

const find = (req, res) =>
  ResponseFactory.withDocs(ChapterService.find, req.params, req, res);


const QuestionController = {
  create,
  update,
  remove,
  find
};

module.exports = QuestionController;

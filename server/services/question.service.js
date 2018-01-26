const PropFactory = require('../factories/prop.factory');

const QuestionModel = require('../models/question.model');

const QuestionSchema = require('../schemas/question.schema.json');


const getCreateProps = data => PropFactory.check(QuestionSchema.create, data.question);

const getUpdateProps = data => PropFactory.check(QuestionSchema.update, data.question);

const getFetchProps = (data) => {
  const { skip, limit } = data;
  const newData = Object.assign({}, { skip: +skip }, { limit: +limit });

  return PropFactory.check(QuestionSchema.fetch, newData);
};

const getToggleProps = data => PropFactory.check(QuestionSchema.toggle, data.question);

const getRemoveProps = data => PropFactory.check(QuestionSchema.remove, data._id);

const getFindProps = data => PropFactory.check(QuestionSchema.find, data._id);

const getFetchByChapterIdProps = data =>
  PropFactory.check(QuestionSchema.findByChapterId, data.chapterId);

const fetch = data =>
  getFetchProps(data)
    .then(({ skip, limit }) => (
      QuestionModel
        .find({ isActive: true })
        .skip(skip)
        .limit(limit)
    ));

const create = data =>
  getCreateProps(data)
    .then(question =>
      new QuestionModel(question).save());

const update = data =>
  getUpdateProps(data)
    .then(({
      _id,
      content,
      answers,
      result,
      chapter
    }) =>
      QuestionModel.findByIdAndUpdate(_id, {
        $set: {
          content,
          answers,
          result,
          chapter
        }
      }));

const toggle = data =>
  getToggleProps(data)
    .then(({ _id, isActive }) =>
      QuestionModel.findByIdAndUpdate(_id, { $set: { isActive } }));

const remove = data =>
  getRemoveProps(data)
    .then(_id => QuestionModel.findByIdAndRemove(_id));

const fetchAll = () => QuestionModel.find({});

const fetchByChapterId = data =>
  getFetchByChapterIdProps(data)
    .then(chapterId => QuestionModel.find({ chapterId }));

const find = data =>
  getFindProps(data)
    .then(_id => QuestionModel.findById(_id));


const QuestionService = {
  fetch,
  create,
  update,
  toggle,
  remove,
  fetchAll,
  fetchByChapterId,
  find
};

module.exports = QuestionService;

const _ = require('lodash');

const PropFactory = require('../factories/prop.factory');

const QuestionModel = require('../models/question.model');

const CreateQuestionSchema = require('../schemas/createQuestion.schema.json');
const UpdateQuestionSchema = require('../schemas/updateQuestion.schema.json');
const FetchQuestionSchema = require('../schemas/fetchQuestion.schema.json');
const ToggleQuestionSchema = require('../schemas/toggleQuestion.schema.json');
const RemoveQuestionSchema = require('../schemas/removeQuestion.schema.json');


const getCreateProps = data => PropFactory.check(CreateQuestionSchema, data);

const getUpdateProps = data => PropFactory.check(UpdateQuestionSchema, data);

const getFetchProps = (data) => {
  const { skip, limit } = data;
  const newData = Object.assign({}, { skip: +skip }, { limit: +limit });

  return PropFactory.check(FetchQuestionSchema, newData);
};

const getToggleProps = data => PropFactory.check(ToggleQuestionSchema, data);

const getRemoveProps = data => PropFactory.check(RemoveQuestionSchema, data);


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
    .then(({ _id, content }) =>
      QuestionModel.findByIdAndUpdate(_id, { $set: { content } }));

const toggle = data =>
  getToggleProps(data)
    .then(({ _id, isActive }) =>
      QuestionModel.findByIdAndUpdate(_id, { $set: { isActive } }));

const remove = data =>
  getRemoveProps(data)
    .then(_id => QuestionModel.findByIdAndRemove(_id));


const QuestionService = {
  fetch,
  create,
  update,
  toggle,
  remove
};

module.exports = QuestionService;

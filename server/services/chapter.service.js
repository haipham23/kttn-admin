const PropFactory = require('../factories/prop.factory');

const ChapterModel = require('../models/chapter.model');

const ChapterSchema = require('../schemas/chapter.schema.json');


const getCreateProps = data => PropFactory.check(ChapterSchema.create, data.chapter);

const getUpdateProps = data => PropFactory.check(ChapterSchema.update, data.chapter);

const getRemoveProps = data => PropFactory.check(ChapterSchema.remove, data._id);

const getFindProps = data => PropFactory.check(ChapterSchema.find, data._id);


const create = data =>
  getCreateProps(data)
    .then(chapter =>
      new ChapterModel(chapter).save());

const update = data =>
  getUpdateProps(data)
    .then(({
      _id,
      title,
      quote,
      prayer
    }) =>
      ChapterModel.findByIdAndUpdate(_id, {
        $set: {
          title,
          quote,
          prayer
        }
      }));

const remove = data =>
  getRemoveProps(data)
    .then(_id => ChapterModel.findByIdAndRemove(_id));

const fetchAll = () => ChapterModel.find({});

const find = data =>
  getFindProps(data)
    .then(_id => ChapterModel.findById(_id));


const QuestionService = {
  create,
  update,
  remove,
  fetchAll,
  find
};

module.exports = QuestionService;

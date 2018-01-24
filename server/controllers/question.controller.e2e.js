const request = require('supertest');
const { expect } = require('chai');

const QuestionController = require('./question.controller');
const QuestionModel = require('../models/question.model');

const app = require('../../tests/app.prep');

app.post('/create-path', QuestionController.create);
app.get('/fetch-path', QuestionController.fetch);
app.post('/update-path', QuestionController.update);
app.post('/toggle-path', QuestionController.toggle);
app.post('/remove-path', QuestionController.remove);

describe.only('question controller', () => {
  describe.only('create()', () => {
    beforeEach((done) => {
      QuestionModel.remove({}, () => done());
    });

    const question1 = {
      question: {
        content: 'First question'
      }
    };

    it('should success', (done) => {
      request(app)
        .post('/create-path')
        .send(question1)
        .expect(200, 'OK')
        .then(() => QuestionModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].content).to.equal('First question');

          done();
        });
    });

    it('should fail', (done) => {
      request(app)
        .post('/create-path')
        .send({})
        .expect(400, 'INVALID_PROPS')
        .then(() => QuestionModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(0);

          done();
        });
    });
  });


  describe('fetch()', () => {
    beforeEach((done) => {
      QuestionModel
        .remove({})
        .then(() =>
          QuestionModel.insertMany([{
            content: 'Update Question 1'
          }, {
            content: 'Update Question 2',
            isActive: false
          }, {
            content: 'Update Question 3'
          }, {
            content: 'Update Question 4'
          }, {
            content: 'Update Question 5'
          }]))
        .then(() => done());
    });

    it('should success - skip 0 limit 2', (done) => {
      request(app)
        .get('/fetch-path?skip=0&limit=2')
        .expect(200)
        .then((docs) => {
          done();
        });
    });
  });


  describe('update()', () => {
    let id;

    beforeEach((done) => {
      QuestionModel
        .remove({})
        .then(() => {
          const Question = new QuestionModel({
            content: 'Update Question 1'
          });

          return Question.save();
        })
        .then((doc) => {
          id = doc._id;

          done();
        });
    });

    it('should success', (done) => {
      const question2 = {
        question: {
          _id: id,
          content: 'Update Question 2'
        }
      };

      request(app)
        .post('/update-path')
        .send(question2)
        .expect(200, 'OK')
        .then(() => QuestionModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].content).to.equal('Update Question 2');

          done();
        });
    });

    it('should fail', (done) => {
      const question2 = {
        question: {
          content: 'Update Question 2'
        }
      };

      request(app)
        .post('/update-path')
        .send(question2)
        .expect(400, 'INVALID_PROPS')
        .then(() => QuestionModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].content).to.equal('Update Question 1');

          done();
        });
    });
  });
});

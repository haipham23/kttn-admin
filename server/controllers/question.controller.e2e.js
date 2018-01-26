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

describe('question controller', () => {
  describe('create()', () => {
    beforeEach((done) => {
      QuestionModel.remove({}, () => done());
    });

    const question1 = {
      question: {
        content: 'First question',
        answers: [
          'Answer 1',
          'Answer 2',
          'Answer 3'
        ],
        result: 1,
        chapter: '1'
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
    const questions = [{
      content: 'Update Question 1',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 1,
      chapter: '1'
    }, {
      content: 'Update Question 2',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 2,
      chapter: '1',
      isActive: false
    }, {
      content: 'Update Question 3',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 3,
      chapter: '1'
    }, {
      content: 'Update Question 4',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 3,
      chapter: '1'
    }, {
      content: 'Update Question 5',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 3,
      chapter: '1'
    }];

    beforeEach((done) => {
      QuestionModel
        .remove({})
        .then(() => QuestionModel.insertMany(questions))
        .then(() => done());
    });

    it('should success - skip 0 limit 2', (done) => {
      request(app)
        .get('/fetch-path?skip=0&limit=2')
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.equal(2);

          expect(response.body[0].content).to.equal('Update Question 1');
          expect(response.body[1].content).to.equal('Update Question 3');

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
            content: 'Update Question 1',
            answers: [
              'Answer 1',
              'Answer 2',
              'Answer 3'
            ],
            result: 1,
            chapter: '1'
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
          content: 'Update Question 2',
          answers: [
            'Answer 1',
            'Answer 2',
            'Answer 3'
          ],
          result: 2,
          chapter: '1'
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
          expect(docs[0].result).to.equal(2);

          done();
        });
    });

    it('should fail', (done) => {
      const question2 = {
        question: {
          content: 'Update Question 2',
          answers: [
            'Answer 1',
            'Answer 2',
            'Answer 3'
          ],
          result: 2,
          chapter: '1'
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

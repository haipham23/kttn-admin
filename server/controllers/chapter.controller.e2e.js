const request = require('supertest');
const { expect } = require('chai');

const ChapterController = require('./chapter.controller');
const ChapterModel = require('../models/chapter.model');

const app = require('../../tests/app.prep');

app.post('/chapter', ChapterController.create);
app.put('/chapter', ChapterController.update);
app.delete('/chapter/:_id', ChapterController.remove);

describe('chapter controller', () => {
  describe('create()', () => {
    beforeEach((done) => {
      ChapterModel.remove({}, () => done());
    });

    const data = {
      chapter: {
        title: 'First title',
        quote: 'First quote',
        prayer: 'First prayer'
      }
    };

    it('should success', (done) => {
      request(app)
        .post('/chapter')
        .send(data)
        .expect(200, 'OK')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].title).to.equal('First title');
          expect(docs[0].quote).to.equal('First quote');
          expect(docs[0].prayer).to.equal('First prayer');

          done();
        });
    });

    it('should fail', (done) => {
      request(app)
        .post('/chapter')
        .send({})
        .expect(400, 'INVALID_PROPS')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(0);

          done();
        });
    });
  });

  describe('update()', () => {
    let id;

    beforeEach((done) => {
      ChapterModel
        .remove({})
        .then(() => {
          const Chapter = new ChapterModel({
            title: 'First title',
            quote: 'First quote',
            prayer: 'First prayer'
          });

          return Chapter.save();
        })
        .then((doc) => {
          id = doc._id;

          done();
        });
    });

    it('should success', (done) => {
      const data = {
        chapter: {
          _id: id,
          title: 'Second title',
          quote: 'Second quote',
          prayer: 'Second prayer'
        }
      };

      request(app)
        .put('/chapter')
        .send(data)
        .expect(200, 'OK')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].title).to.equal('Second title');
          expect(docs[0].quote).to.equal('Second quote');
          expect(docs[0].prayer).to.equal('Second prayer');

          done();
        });
    });

    it('should fail', (done) => {
      const data = {
        chapter: {
          title: 'Second title',
          quote: 'Second quote',
          prayer: 'Second prayer'
        }
      };

      request(app)
        .put('/chapter')
        .send(data)
        .expect(400, 'INVALID_PROPS')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].title).to.equal('First title');

          done();
        });
    });
  });


  describe('remove()', () => {
    let id;

    beforeEach((done) => {
      ChapterModel
        .remove({})
        .then(() => {
          const Question = new ChapterModel({
            title: 'First title',
            quote: 'First quote',
            prayer: 'First prayer'
          });

          return Question.save();
        })
        .then((doc) => {
          id = doc._id;

          done();
        });
    });

    it('should success', (done) => {
      request(app)
        .delete(`/chapter/${id}`)
        .expect(200, 'OK')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(0);

          done();
        });
    });

    it('should fail', (done) => {
      request(app)
        .delete('/chapter/1')
        .expect(400, 'SERVER_ERROR')
        .then(() => ChapterModel.find({}))
        .then((docs) => {
          expect(docs.length).to.equal(1);
          expect(docs[0].title).to.equal('First title');

          done();
        });
    });
  });
});

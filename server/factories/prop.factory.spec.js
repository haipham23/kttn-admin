const { expect } = require('chai');

const PropFactory = require('./prop.factory');

const schema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1
    },
    answers: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 3,
      maxItems: 5,
      uniqueItems: true
    },
    result: {
      type: 'number',
      minimum: 1,
      maximum: { $data: '1/answers/length' }
    }
  },
  required: ['content']
};

describe('PropFactory', () => {
  it('should validate', (done) => {
    const data = {
      content: 'Test',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 1
    };

    PropFactory
      .check(schema, data)
      .then(() => done());
  });

  it('should remove additional prop', () => {
    it('should validate', (done) => {
      const data = {
        content: 'Test',
        answers: [
          'Answer 1',
          'Answer 2',
          'Answer 3'
        ],
        result: 1,
        dummy: 'Test'
      };

      PropFactory
        .check(schema, data)
        .then((result) => {
          expect(result).not.to.have.property('dummy');

          done();
        });
    });
  });

  it('should fail to validate', (done) => {
    const data = {
      dummy: 'Test'
    };

    PropFactory
      .check(schema, data)
      .catch((e) => {
        expect(e.message).to.equal('INVALID_PROPS');

        done();
      });
  });

  it('should fail to validate - invalid answers', (done) => {
    const data = {
      content: 'Test',
      answers: [],
      result: 1
    };

    PropFactory
      .check(schema, data)
      .catch((e) => {
        expect(e.message).to.equal('INVALID_PROPS');

        done();
      });
  });

  it('should fail to validate - invalid result', (done) => {
    const data = {
      content: 'Test',
      answers: [
        'Answer 1',
        'Answer 2',
        'Answer 3'
      ],
      result: 9
    };

    PropFactory
      .check(schema, data)
      .catch((e) => {
        expect(e.message).to.equal('INVALID_PROPS');

        done();
      });
  });
});

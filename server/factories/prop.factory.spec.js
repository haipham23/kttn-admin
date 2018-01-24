const { expect } = require('chai');

const PropFactory = require('./prop.factory');

const schema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 1
    }
  },
  required: ['content']
};

describe('PropFactory', () => {
  it('should validate', (done) => {
    const data = {
      content: 'Test'
    };

    PropFactory
      .check(schema, data)
      .then(() => done());
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
});

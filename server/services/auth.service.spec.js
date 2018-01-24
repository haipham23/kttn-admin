const axios = require('axios');
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const { expect } = require('chai');
const MockAdapter = require('axios-mock-adapter');

const auth = require('./auth.service');

describe.only('auth services', () => {
  const sandbox = sinon.sandbox.create();
  const mockRequest = new MockAdapter(axios);

  afterEach(() => {
    mockRequest.reset();
    sandbox.restore();
  });


  describe('getTokenFromReq()', () => {
    it('should return token from header', (done) => {
      const req = mockReq({
        headers: {
          'x-auth': 'DummyToken'
        }
      });

      auth.getTokenFromReq(req)
        .then((token) => {
          expect(token).to.equal('DummyToken');

          done();
        });
    });

    it('should return empty token', (done) => {
      auth.getTokenFromReq(mockReq)
        .catch((error) => {
          expect(error.message).to.equal('NO_TOKEN');

          done();
        });
    });
  });


  describe('verifyToken()', () => {
    it('should verify token', (done) => {
      mockRequest.onGet().reply(200, { result: 'OK' });

      auth.verifyToken('DUMMY_TOKEN').then((response) => {
        expect(response.data).to.deep.equal({ result: 'OK' });

        done();
      });
    });

    it('should failed to verify token and get 400 status', (done) => {
      mockRequest.onGet().reply(400);

      auth.verifyToken('DUMMY_TOKEN').catch((error) => {
        expect(error.response.status).to.equal(400);

        done();
      });
    });
  });


  describe.only('isAuth()', () => {
    it('should verify token and move to next function', (done) => {
      sandbox.stub(auth, 'getTokenFromReq').callsFake(() => Promise.resolve());
      sandbox.stub(auth, 'verifyToken').callsFake(() => Promise.resolve());

      const next = () => done();

      auth.isAuth(mockReq, mockRes, next);
    });

    it('should failed - getTokenFromReq() - throw AUTH_REQUIRED error', (done) => {
      sandbox.stub(auth, 'getTokenFromReq').callsFake(() => Promise.reject());

      const next = (error) => {
        expect(error).to.equal('AUTH_REQUIRED');

        done();
      };

      auth.isAuth(mockReq, mockRes, next);
    });

    it('should failed - verifyToken() - throw AUTH_REQUIRED error', (done) => {
      sandbox.stub(auth, 'getTokenFromReq').callsFake(() => Promise.resolve());
      sandbox.stub(auth, 'verifyToken').callsFake(() => Promise.reject());

      const next = (error) => {
        expect(error).to.equal('AUTH_REQUIRED');

        done();
      };

      auth.isAuth(mockReq, mockRes, next);
    });
  });
});

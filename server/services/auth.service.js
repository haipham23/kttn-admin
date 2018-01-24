const axios = require('axios');
const getenv = require('getenv');

const AUTH_API = getenv('AUTH_API');


const getTokenFromReq = req =>
  new Promise((resolve, reject) => {
    const token = req.headers
      ? req.headers['x-auth']
      : null;

    return token
      ? resolve(token)
      : reject(new Error('NO_TOKEN'));
  });

const getVerifyUrl = token => `${AUTH_API}/api/account/verify/${token}`;

const verifyToken = token => axios.get(getVerifyUrl(token));


const isAuth = (req, res, next) =>
  getTokenFromReq(req)
    .then(verifyToken)
    .then(() => next())
    .catch(() => next('AUTH_REQUIRED'));


const auth = {
  isAuth,
  getTokenFromReq,
  verifyToken
};

module.exports = auth;

const logger = require('../factories/log.factory');


const formatMsg = (msg) => {
  logger.error('log error: -- ', msg);

  switch (msg) {
    case 'INVALID_PROPS':
      return 'INVALID_PROPS';

    default:
      return 'SERVER_ERROR';
  }
};


const ok = (service, data, req, res) =>
  service(data)
    .then(() => res.status(200).send('OK'))
    .catch(error => res.status(400).send(formatMsg(error.message)));


const withDocs = (service, data, req, res) =>
  service(data)
    .then(docs => res.status(200).json(docs))
    .catch(error => res.status(400).send(formatMsg(error.message)));


const ResponseFactory = {
  ok,
  withDocs
};

module.exports = ResponseFactory;

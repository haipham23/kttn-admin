const winston = require('winston');
const getenv = require('getenv');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: getenv('LOG_LEVEL', 'error'),
      colorize: true,
      timestamp: true
    })
  ]
});

module.exports = logger;

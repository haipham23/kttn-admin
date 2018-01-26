const Ajv = require('ajv');

const logger = require('../factories/log.factory');

const ajv = new Ajv({
  allErrors: true,
  v5: true,
  removeAdditional: true,
  $data: true
});

const validateAndLogError = (nAjv, schema, data) => {
  const result = nAjv.validate(schema, data);

  if (!result) {
    logger.error('validation: -- ', ajv.errorsText(), data);
  }

  return result;
};

const check = (schema, data) => (
  new Promise((resolve, reject) => (
    validateAndLogError(ajv, schema, data)
      ? resolve(data)
      : reject(new Error('INVALID_PROPS'))
  )));


const PropFactory = {
  check
};

module.exports = PropFactory;

const Ajv = require('ajv');

const ajv = new Ajv({
  allErrors: true,
  v5: true,
  removeAdditional: true,
  $data: true,
  $comment: process.env.NODE_ENV !== 'production',
  logger: console
});

const check = (schema, data) => {
  console.log('validation', schema, data);

  return new Promise((resolve, reject) => (
    ajv.validate(schema, data)
      ? resolve(data)
      : reject(new Error('INVALID_PROPS'))
  ));
};


const PropFactory = {
  check
};

module.exports = PropFactory;

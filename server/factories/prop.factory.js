const Ajv = require('ajv');

const ajv = new Ajv({
  allErrors: true,
  v5: true,
  removeAdditional: true,
  $data: true
});

const check = (schema, data) =>
  new Promise((resolve, reject) => (
    ajv.validate(schema, data)
      ? resolve(data)
      : reject(new Error('INVALID_PROPS'))
  ));


const PropFactory = {
  check
};

module.exports = PropFactory;

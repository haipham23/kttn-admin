const Ajv = require('ajv');

const ajv = new Ajv();


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

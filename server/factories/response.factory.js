const ok = (service, data, req, res) =>
  service(data)
    .then(() => res.status(200).send('OK'))
    .catch(error => res.status(400).send(error.message));


const withDocs = (service, data, req, res) =>
  service(data)
    .then(docs => res.status(200).json(docs))
    .catch(error => res.status(400).send(error.message));

const ResponseFactory = {
  ok,
  withDocs
};

module.exports = ResponseFactory;

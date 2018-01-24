const ok = (service, data, req, res) =>
  service(data)
    .then(() => res.send('OK'))
    .catch(error => res.status('400').send(error.message));


const ResponseFactory = {
  ok
};

module.exports = ResponseFactory;

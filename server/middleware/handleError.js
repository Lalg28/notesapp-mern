const ERROR_HANDLERS = {
  CastError: (response) =>
    response.status(400).send({ error: "id use is malformed" }),
  ValidationError: (response, error) =>
    response.status(409).send({ error: error.message }),
  JsonWebTokenError: (response) =>
    response.status(401).json({ error: "Token missing or invalid" }),
  defaultError: response => response.status(500).end()
};

module.exports = (error, request, response, next) => {
  console.log(error);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
};

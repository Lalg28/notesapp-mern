const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodeToken = {};

  try {
    decodeToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  if (!token || !decodeToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const { id: userId } = decodeToken;
  request.userId = userId

  next()
};

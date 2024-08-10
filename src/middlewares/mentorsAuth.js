const createHttpError = require("http-errors");
const jwt = require("../lib/jwt");
const koderUsecases = require("../usecases/koders.usecases");

function auth(request, response, next) {
  try {
    const authorization = request.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw createHttpError(401, "Token is required");
    }
    const payload = jwt.verify(token);
    const koder = koderUsecases.getById(payload.id);
    request.koder = koder;
    next();
  } catch (error) {
    response.status(error.status || 401);
    response.json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;

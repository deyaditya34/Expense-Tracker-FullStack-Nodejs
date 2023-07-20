const httpError = require("http-errors");

function notFoundHandler(req, res, next) {
    next(httpError.NotFound("Resource not found"));
}

module.exports = {notFoundHandler};
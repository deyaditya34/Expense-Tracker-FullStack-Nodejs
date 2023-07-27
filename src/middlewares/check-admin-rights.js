const httpError = require("http-errors");

function checkAdminRights(req, res, next) {
  const {user} = req.body;

  if (!user) {
    throw new httpError.Forbidden("No user found to check rights")
  }

  if (user.role !== "ADMIN") {
    throw new httpError.Unauthorized("User not authorized. Please provide a valid token");
  }

  next();
}

module.exports = checkAdminRights;
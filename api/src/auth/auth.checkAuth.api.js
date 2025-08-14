const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const authService = require("./auth.service");

async function controller(req, res) {
  const token = req.cookies.token;
  
  if (!token) {
    throw new httpError.Forbidden("Access Denied");
  }

  const user = await authService.getUserFromToken(token);

  if (!user) {
    res.json({
      success: false,
      error: "Invalid Token",
    });
    return;
  }

  res.json({
    success: true,
    data: "user verified",
  });
}

module.exports = buildApiHandler([controller]);

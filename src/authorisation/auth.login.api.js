const httpError = require("http-errors");
const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const { username, password } = req.body;

  const token = await authService.login(username, password);

  res.json({
    success: true,
    data: {
      username,
      token,
    },
  });
}

function validateParams(req, res, next) {
  const { username, password } = req.body;

  if (!typeof username === "string" || !typeof password === "string") {
    throw new httpError.BadRequest(
      "Username and Password should be string type"
    );
  }

  if (username.length < 8) {
    throw new httpError.BadRequest("Username should be atleast 8 characters");
  }

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["username", "password"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler(controller, [
  missingParamsValidator,
  validateParams,
]);

const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const {validateUsername} = require("./auth.utils");

async function controller(req, res) {
  const { username, password } = req.query;

  const token = await authService.login(username, password);

  res.json({
    success: true,
    data: {
      username,
      token,
    },
  });
}

const usernameValidator = validateUsername;

const missingParamsValidator = paramsValidator.createParamValidator(
  ["username", "password"],
  paramsValidator.PARAM_KEY.QUERY
);

module.exports = buildApiHandler([
  missingParamsValidator,
  usernameValidator,
  controller
]);

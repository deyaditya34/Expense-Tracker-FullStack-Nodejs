const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const {validateUsername} = require("./auth.utils");
const userResolver = require("../middlewares/user-resolver");

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

const usernameValidator = validateUsername;

const missingParamsValidator = paramsValidator.createParamValidator(
  ["username", "password"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  usernameValidator,
  controller
]);

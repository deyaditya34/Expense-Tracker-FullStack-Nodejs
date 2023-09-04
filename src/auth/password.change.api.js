const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const { validateUsername } = require("./auth.utils");


async function controller(req, res) {
  const { username, password, newPassword } = req.body;

  const updatedToken = await authService.changePassword(
    username,
    password,
    newPassword
  );

  res.json({
    message: "Password Changed Successfully",
    token: updatedToken,
  });
}

const usernameValidator = validateUsername;

const missingParamsValidator = paramsValidator.createParamValidator(
  ["username", "password", "newPassword"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  missingParamsValidator,
  usernameValidator,
  controller,
]);

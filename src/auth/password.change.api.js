const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const { validateUsername } = require("./auth.utils");
const userResolver = require("../middlewares/user-resolver");

async function controller(req, res) {
  const { user, password, newPassword } = req.body;

  const userDetails = await authService.retrieveUserDetails(user.username);
  console.log("user -", userDetails);

  await authService.updatePassword(userDetails, password, newPassword);

  res.json({
    message: "Password Changed Successfully",
  });
}

const usernameValidator = validateUsername;

const missingParamsValidator = paramsValidator.createParamValidator(
  ["username", "password", "newPassword"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  usernameValidator,
  controller,
]);

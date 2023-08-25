const httpError = require("http-errors");
const userResolver = require("../middlewares/user-resolver");
const { createBalance } = require("./balance.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const { balance } = req.body;

  let result = await createBalance({ balance });

  res.json({
    message: "Success",
    data: result,
  });
}

function validateParams(req, res, next) {
  const { balance } = req.body;

  if (balance) {
    if (typeof balance !== "number") {
      throw new httpError.BadRequest(
        "Field 'balance' should be of 'number' type"
      );
    }
  }

  Reflect.set(req.query, "balance", balance);

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["balance"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

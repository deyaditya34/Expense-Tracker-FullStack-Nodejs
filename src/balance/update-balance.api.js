const httpError = require("http-errors");
const userResolver = require("../middlewares/user-resolver");
const { updateBalance } = require("./balance.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const { amount } = req.body;

  const result = await updateBalance(amount);

  res.json({
    message: "Balance Updated",
    balance: result.amount,
  });
}

function validateParams(req, res, next) {
  const { amount } = req.body;

  if (amount) {
    if (typeof amount !== "number") {
      throw new httpError.BadRequest(
        "Field 'amount' should be of 'number' type"
      );
    }
  }

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["amount"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

const httpError = require("http-errors");
const userResolver = require("../middlewares/user-resolver");
const { createBalance } = require("./balance.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const { amount } = req.body;

  let result = await createBalance({ amount });

  res.json({
    message: "Success",
    data: result,
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

  Reflect.set(req.query, "amount", amount);

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

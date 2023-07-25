const buildApiHandler = require("../api-utils/build-api-handler");
const paramValidator = require("../middlewares/params-validator");
const httpError = require("http-errors");
const { createTransactionForUser } = require("./transactions.service");
const userResolver = require("../middlewares/user-resolver");
const { getCategoryForUser } = require("../categories/categories.service");

async function controller(req, res) {
  const { type, amount, category, date } = req.body;

  const result = await createTransactionForUser({
    type,
    amount,
    category,
    date,
  });

  res.json({
    success: result.acknowledged,
    data: {
      transaction: {
        _id: result.insertedId,
      },
    },
  });
}

async function validateParams(req, res, next) {
  const { type, amount, id } = req.body;

  if (typeof type === "string") {
    if (type !== "DEBIT" && type !== "CREDIT") {
      throw new httpError.BadRequest(
        "Field 'type' shoould be either 'DEBIT' or 'CREDIT'"
      );
    }
  } else {
    throw new httpError.BadRequest("Field 'type' should be 'string' type only");
  }

  if (typeof amount !== "number") {
    throw new httpError.BadRequest(
      "Field 'amount' should be consisted of 'number' type"
    );
  }

  const transactionCategoryValidator = await getCategoryForUser(id);
  if (transactionCategoryValidator.length === 0) {
    throw new httpError.BadRequest("Field 'id' is invalid");
  } else {
    Reflect.set(req.body, "category", id);
  }

  next();
}

const missingParamsValidator = paramValidator.createParamValidator(
  ["type", "amount", "id"],
  paramValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler(
  [controller],
  [userResolver, missingParamsValidator, validateParams]
);

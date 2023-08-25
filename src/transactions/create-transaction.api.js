const httpError = require("http-errors");
const userResolver = require("../middlewares/user-resolver");
const { createTransaction } = require("./transactions.service");
const paramValidator = require("../middlewares/params-validator");
const buildApiHandler = require("../api-utils/build-api-handler");
const { getCategory } = require("../categories/categories.service");
const {updateBalance} = require("../balance/balance.service");

async function controller(req, res) {
  const { type, amount, category, date, user } = req.body;

  const result = await createTransaction({
    type,
    amount,
    category,
    date,
    createdAt: new Date(),
    createdBy: user,
  });

  let balanceUpdate = 0;

  if (type === "DEBIT") {
    balanceUpdate = await updateBalance(-amount);
  } else {
    balanceUpdate = await updateBalance(amount);
  }

  res.json({
    success: result.acknowledged,
    data: {
      transaction: {
        _id: result.insertedId,
        balance: balanceUpdate.balance,
      },
    },
  });
}

async function validateParams(req, res, next) {
  const { type, amount, date, categoryId } = req.body;

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

  const transactionCategoryValidator = await getCategory(categoryId);
  if (transactionCategoryValidator.length === 0) {
    throw new httpError.BadRequest("Field 'categoryId' is invalid");
  } else {
    if (transactionCategoryValidator[0].type !== type) {
      throw new httpError.BadRequest(
        "'Category Type' retrieved from the 'categoryId' does not match with the requested 'type'"
      );
    }
    console.log("transactionCategoryValidator", transactionCategoryValidator);
    Reflect.set(req.body, "category", transactionCategoryValidator);
  }

  if (date) {
    if (typeof date !== "string") {
      throw new httpError.BadRequest("'Date' should be 'string' type");
    }

    if (new Date(date).valueOf() > 0) {
      next();
    } else {
      throw new httpError.BadRequest(
        `invalid 'Date' - '${date}. 'Date' should be either in format 'year-month-day' or 'month-day-year'`
      );
    }
  }
}

const missingParamsValidator = paramValidator.createParamValidator(
  ["type", "amount", "categoryId", "date"],
  paramValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

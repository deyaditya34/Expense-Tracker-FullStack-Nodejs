const httpError = require("http-errors");

const eventBridge = require("../events/event.service");
const config = require("../config");
const userResolver = require("../middlewares/user-resolver");
const { createTransaction } = require("./transactions.service");
const paramValidator = require("../middlewares/params-validator");
const buildApiHandler = require("../api-utils/build-api-handler");
const { getCategory } = require("../categories/categories.service");
const { ObjectId } = require("mongodb");

async function controller(req, res) {
  const { user } = req.body;

  const transactionDetails = await transactionBuilder(req.body);

  const result = await createTransaction({
    ...transactionDetails,
    createdAt: new Date(),
    createdBy: user.username,
  });

  eventBridge.emit(config.EVENT_NAMES_TRANSACTIONS_CREATED, transactionDetails.type, transactionDetails.amount);

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
  const { amount, date, categoryId } = req.body;

  const transactionOptionalNumberParams = [
    "cashInflow",
    "cashOutflow",
    "bankInflow",
    "bankOutflow",
  ];

  const transactionOptionalStringParams = ["status", "notes"];

  transactionOptionalNumberParams.forEach((param) => {
    if (Reflect.has(req.body, param)) {
      if (typeof req.body[param] !== "number") {
        throw new httpError.BadRequest(
          `Field '${param}' should be 'number' type only`
        );
      }
    }
  });

  transactionOptionalStringParams.forEach((param) => {
    if (Reflect.has(req.body, param)) {
      if (typeof req.body[param] !== "string") {
        throw new httpError.BadRequest(
          `Field '${param}' should be 'string' type only`
        );
      } else if (param === "status") {
        if (req.body[param] !== "complete" || req.body[param] !== "pending") {
          throw new httpError.BadRequest(
            `Field '${param}' should be either "pending" or "complete"`
          );
        }
      }
    }
  });

  if (typeof amount !== "number") {
    throw new httpError.BadRequest(
      "Field 'amount' should be consisted of 'number' type"
    );
  }

  const transactionCategoryValidator = await getCategory(categoryId);
  if (transactionCategoryValidator.length === 0) {
    throw new httpError.BadRequest("Field 'categoryId' is invalid");
  }

  Reflect.set(req.body, "category", transactionCategoryValidator.name);

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

async function transactionBuilder(transactionDetails = {}) {
  const result = {};

  const transactionParams = [
    "type",
    "amount",
    "date",
    "categoryId",
    "cashInflow",
    "cashOutflow",
    "bankInflow",
    "bankOutflow",
    "status",
    "notes",
  ];

  for (const param of transactionParams) {
    if (Reflect.has(transactionDetails, param)) {
      if (param === "type" || param === "status" || param === "notes") {
        result[param] = transactionDetails[param]
      } else if (param === "date") {
        result[param] =  new Date(transactionDetails[param]);
      } else if (param === "categoryId") {
        const categoryDetails = await getCategory(transactionDetails[param]);
        result["type"] = categoryDetails.type;
        result["categoryId"] = new ObjectId(transactionDetails[param])
      } else if (
        param === "amount" ||
        param === "cashInflow" ||
        param === "cashOutflow" ||
        param === "bankInflow" ||
        param === "bankOutflow"
      ) {
        result[param] = Number(transactionDetails[param]);
      }
    }
  }
  return result;
}

const missingParamsValidator = paramValidator.createParamValidator(
  ["amount", "categoryId", "date"],
  paramValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

const httpError = require("http-errors");
const pagination = require("../middlewares/pagination");
const userResolver = require("../middlewares/user-resolver");
const { searchTransaction } = require("./transactions.service");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const { user } = req.body;
  const { type, amount, dateTo, dateFrom, categoryName, pageNo, pageSize } =
    req.query;

  console.log("req.query -", req.query);

  let searchTransactionParams = {};

  if (type) {
    searchTransactionParams.type = type;
  }

  if (amount) {
    searchTransactionParams.amount = amount;
  }

  if (categoryName) {
    searchTransactionParams["category.name"] = categoryName;
  }

  if (dateTo && !dateFrom) {
    searchTransactionParams["date"] = { $lte: new Date(dateTo) };
  }
  if (!dateTo && dateFrom) {
    searchTransactionParams["date"] = { $gte: new Date(dateFrom) };
  }
  if (dateTo && dateFrom) {
    searchTransactionParams["date"] = {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    };
  }
  
  const result = await searchTransaction(
    searchTransactionParams,
    pageNo,
    pageSize,
    user.username
  );

  res.json({
    message: "Transactions found",
    data: result,
  });
}

function validateParams(req, res, next) {
  let { type, amount, dateFrom, dateTo, categoryName } = req.query;

  if (amount) {
    let amountParseInt = parseInt(amount);

    if (Number.isNaN(amountParseInt) === true) {
      throw new httpError.BadRequest(
        "Invalid 'Field' - 'amount'. It supports only numbers."
      );
    }
    Reflect.set(req.query, "amount", amountParseInt);
  }

  if (type) {
    if (type !== "debit" && type !== "credit") {
      throw new httpError.BadRequest(
        "Field 'type' should be either 'debit' or 'credit'"
      );
    }
  }

  if (categoryName) {
    if (typeof categoryName !== "string") {
      throw new httpError.BadRequest(
        `Field categoryName -'${categoryName}' should be 'string' type.`
      );
    }
  }

  if (dateFrom) {
    if (typeof dateFrom !== "string") {
      throw new httpError.BadRequest(
        "Field 'dateFrom' should be 'string' type"
      );
    }

    if (!new Date(dateFrom).valueOf() > 0) {
      throw new httpError.BadRequest(
        `invalid 'dateFrom' - '${dateFrom}. 'Date' should be either in format 'year-month-day' or 'month-day-year'`
      );
    }
  }

  if (dateTo) {
    if (typeof dateTo !== "string") {
      throw new httpError.BadRequest("Field 'dateTo' should be 'string' type");
    }

    if (!new Date(dateTo).valueOf() > 0) {
      throw new httpError.BadRequest(
        `invalid 'dateFrom' - '${dateTo}. 'Date' should be either in format 'year-month-day' or 'month-day-year'`
      );
    }
  }

  next();
}

module.exports = buildApiHandler([
  userResolver,
  pagination,
  validateParams,
  controller,
]);

const httpError = require("http-errors");
const pagination = require("../middlewares/pagination");
const userResolver = require("../middlewares/user-resolver");
const { searchTransaction } = require("./transactions.service");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const { user } = req.body;
  const { type, amount, dateTo, dateFrom, categoryName, pageNo, pageSize } =
    req.query;

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

  const adjustToUTC = (dateStr, endOfDay = false) => {
    const date = new Date(dateStr);
    if (endOfDay) {
      date.setUTCHours(23, 59, 59, 999);
    } else {
      date.setUTCHours(0, 0, 0, 0);
    }
    return date.toISOString();
  };

  // Correctly handling dateFrom and dateTo
  if (dateTo && !dateFrom) {
    searchTransactionParams.date = { $lte: adjustToUTC(dateTo, true) };
  } else if (!dateTo && dateFrom) {
    searchTransactionParams.date = { $gte: adjustToUTC(dateFrom) };
  } else if (dateTo && dateFrom) {
    searchTransactionParams.date = {
      $gte: adjustToUTC(dateFrom),
      $lte: adjustToUTC(dateTo, true),
    };
  }

  const result = await searchTransaction(
    searchTransactionParams,
    user.username,
    pageNo,
    pageSize
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

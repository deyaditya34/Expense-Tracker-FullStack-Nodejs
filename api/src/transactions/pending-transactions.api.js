const httpError = require("http-errors");

const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const pagination = require("../middlewares/pagination");
const paramsValidator = require("../middlewares/params-validator");
const transactionService = require("./transactions.service");

async function controller(req, res) {
  const { dateTo, dateFrom, pageNo, pageSize } = req.query;
  const {user} = req.body;

  const adjustToUTC = (dateStr, endOfDay = false) => {
    const date = new Date(dateStr);
    if (endOfDay) {
      date.setUTCHours(23, 59, 59, 999);
    } else {
      date.setUTCHours(0, 0, 0, 0);
    }
    return date.toISOString();
  };

  const pendingTransactionParams = {
    date: { $gte: adjustToUTC(dateFrom),
      $lte: adjustToUTC(dateTo, true), },
    status: "pending",
  };

  const pendingTransactions = await transactionService.searchPendingTransaction(
    pendingTransactionParams,
    user.username,
    pageNo,
    pageSize
  );

  res.json({
    message: "Transactions found",
    data: pendingTransactions,
  });
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["dateTo", "dateFrom"],
  paramsValidator.PARAM_KEY.QUERY
);

function validateParams(req, res, next) {
  const { dateTo, dateFrom } = req.query;

  if (typeof dateTo !== "string") {
    throw new httpError.BadRequest(
      `Field 'dateTo' - '${dateTo}' should be 'string' type.`
    );
  } else if (!new Date(dateTo).valueOf() > 0) {
    throw new httpError.BadRequest(
      `invalid 'dateTo' - '${dateTo}', should be either in format 'year-month-day' or 'month-day-year' `
    );
  }

  if (typeof dateFrom !== "string") {
    throw new httpError.BadRequest(
      `Field 'dateFrom' - '${dateFrom}' should be 'string' type.`
    );
  } else if (!new Date(dateFrom).valueOf() > 0) {
    throw new httpError.BadRequest(
      `invalid 'dateFrom' - '${dateFrom}', should be either in format 'year-month-day' or 'month-day-year' `
    );
  }

  next();
}

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  pagination,
  validateParams,
  controller,
]);

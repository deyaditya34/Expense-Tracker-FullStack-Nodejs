const httpError = require("http-errors");
const pagination = require("../middlewares/pagination");
const userResolver = require("../middlewares/user-resolver");
const { searchTransaction } = require("./transactions.service");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const { type, amount, categoryName, pageNo, pageSize } =
    req.query;

  let searchTransactionParams = {};

  if (type) {
    searchTransactionParams.type = type;
  }

  if (amount) {
    searchTransactionParams.amount = amount;
  }
  
  if (categoryName) {
    searchTransactionParams = {"category.name": categoryName}

  }

  const result = await searchTransaction(
    {...searchTransactionParams},
    pageNo,
    pageSize
  );

  if (result.length === 0) {
    res.json({
      message: "No transactions found for the respective search",
    });
  } else {
    res.json({
      message: "Transactions found",
      data: result,
    });
  }
}

function validateParams(req, res, next) {
  let { type, amount } = req.query;

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
    if (type !== "DEBIT" && type !== "CREDIT") {
      throw new httpError.BadRequest(
        "Field 'type' should be either 'DEBIT' or 'CREDIT'"
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

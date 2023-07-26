const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const httpError = require("http-errors");
const {searchTransaction} = require("./transactions.service");

async function controller(req, res) {
  const {query} = req.body;

  const result = await searchTransaction(query);

  if (result.length === 0) {
    res.json({
      message: "No transactions found for the respective search",
    });
  } else {
    res.json({
      message: "Transactions found",
      data: result
    });
  }
}

function validateParams(req, res, next) {
  let { type, amount } = req.body.query;

  let parsedQuery = {};

  if (amount) {
    if (typeof amount === "number") {
    parsedQuery.amount = amount;
  } else {
    throw new httpError.BadRequest("Field 'amount' should be of 'number' type");
  }
  }
  
  if (type) {
    if (typeof type !== "string") {
      throw new httpError.BadRequest("Field 'type' should be of string type");
    }
    if (type !== "DEBIT" && type !== "CREDIT") {
      throw new httpError.BadRequest("Field 'type' should be either 'DEBIT' or 'CREDIT'");
    } 
    parsedQuery.type = type;
  }
  
  if (!type && !amount) {
    throw new httpError.BadRequest(
      `Fields 'name', 'amount' or 'type' is mandatory in the request`
    );
  }

  Reflect.set(req.body, "query", parsedQuery);

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["searchTransaction"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([controller], [userResolver, missingParamsValidator,  validateParams])
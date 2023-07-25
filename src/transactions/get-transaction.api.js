const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const {getTransactionForUser} = require("./transactions.service");
const httpError= require("http-errors");

async function controller(req, res) {
  const {id} = req.body;

  const result = await getTransactionForUser(id);

  if (!result) {
    res.json({
      message: `No transaction found for the id '${id}'`
    })
  } else {
    res.json({
      message: "Transaction found",
      data: result
    })
  }
}

function validateParams(req, res, next) {
  const errorTypedFields = ["id"].filter(
    (field) => typeof Reflect.get(req.body, field) !== "string"
  );

  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(",")}' should be of string type`
    );
  }

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["id"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([controller], [userResolver, missingParamsValidator, validateParams])
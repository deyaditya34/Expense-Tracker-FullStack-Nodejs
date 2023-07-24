const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const { createCategoryForUser } = require("./categories.service");


async function controller(req, res) {
  let { color, name, type } = req.body;
  
  const result = await createCategoryForUser({ color, name, type });
  
  res.json({
    success: result.acknowledged,
    data: {
      catergory: {
        _id: result.insertedId,
      },
    },
  });
  
}

function validateParams(req, res, next) {
  const errorTypedFields = ["color", "name", "type"].filter(
    (field) => typeof Reflect.get(req.body, field) !== "string"
  );
  console.log("ErrorFields are", errorTypedFields); 
  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(", ")}' should be of string type`
    );
  }

  let { type } = req.body;

  if (type !== "DEBIT" && type !== "CREDIT") {
    throw new httpError.BadRequest(
      `Field 'type' should be either 'DEBIT' or 'CREDIT'`
    );
  }
  next();
}

const missingParamsValidator = paramsValidator.createParamValidator([
  "name",
  "color",
  "type",
], paramsValidator.PARAM_KEY.BODY);

module.exports = buildApiHandler(controller, [userResolver, missingParamsValidator, validateParams]);
const httpError = require("http-errors");
const {getCategory} = require("./categories.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const id = req.body;

  const result = await getCategory(id);

  if (result.length === 0) {
    res.json({
      message: "No category found for the id",
    });
  } else {
    res.json({
      message: "Category Found",
      data: result,
    });
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

module.exports = buildApiHandler([userResolver, missingParamsValidator, validateParams, controller])

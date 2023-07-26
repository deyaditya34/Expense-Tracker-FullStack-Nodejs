const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const { createCategory } = require("./categories.service");
const {searchCategory} = require("./categories.service");
const checkAdminRights = require("../middlewares/check-admin-rights");

async function controller(req, res) {
  let { color, name, type } = req.body;

  const result = await createCategory({ color, name, type });

  res.json({
    success: result.acknowledged,
    data: {
      catergory: {
        _id: result.insertedId,
      },
    },
  });
}

async function validateParams(req, res, next) {
  const errorTypedFields = ["color", "name", "type"].filter(
    (field) => typeof Reflect.get(req.body, field) !== "string"
  );
  console.log("ErrorFields are", errorTypedFields);
  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(", ")}' should be of string type`
    );
  }

  let {type, name } = req.body;

  if (type !== "DEBIT" && type !== "CREDIT") {
    throw new httpError.BadRequest(
      `Field 'type' should be either 'DEBIT' or 'CREDIT'`
    );
  }
  
  const categoryValidator = await searchCategory({name});
  
  if (categoryValidator.length > 0) {
    throw new httpError.BadRequest(`Category '${name}' already exists.`)
  } 
  
  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["name", "color", "type"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([controller], [
  userResolver,
  checkAdminRights,
  missingParamsValidator,
  validateParams,
]);

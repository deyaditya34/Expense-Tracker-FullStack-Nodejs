const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const searchCategoryForUser = require("./categories.service");

async function controller(req, res) {
  let { searchCategory } = req.body;
  
  const result = await searchCategoryForUser({...searchCategory });

  if (result.length === 0) {
    res.json({
      message: "No categories found for the respective search",
    });
  } else {
    res.json({
      message: "Categories found",
      data: result
    });
  }
}

function validateParams(req, res, next) {

  let { name, color, type } = req.body.searchCategory;

  let parsedSearchCategory = {};

  if (name) {
    if (typeof name === "string") {
    parsedSearchCategory.name = name;
  } else {
    throw new httpError.BadRequest("Field 'name' should be of string type");
  }
  }

  if (color) {
    if (typeof color === "string") {
    parsedSearchCategory.color = color;
  } else {
    throw new httpError.BadRequest("Field 'color' should be of string type");
  }
  }

  if (type) {
    if (typeof type !== "string") {
      throw new httpError.BadRequest("Field 'type' should be of string type");
    }
    if (type !== "DEBIT" && type !== "CREDIT") {
      throw new httpError.BadRequest("Field 'type' should be either 'DEBIT' or 'CREDIT'");
    } 
    parsedSearchCategory.type = type;
  }

  if (!name && !color && !type) {
    throw new httpError.BadRequest(
      `Fields 'name', 'color' or 'type' is mandatory in the request`
    );
  }

  Reflect.set(req.body, "searchCategory", parsedSearchCategory);

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["searchCategory"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([controller], [
  userResolver,
  missingParamsValidator,
  validateParams,
],
controller);

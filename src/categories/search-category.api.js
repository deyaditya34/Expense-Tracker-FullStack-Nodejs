const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const {searchCategory} = require("./categories.service");

async function controller(req, res) {
  let { query } = req.body;
  
  const result = await searchCategory(query);

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

  let { name, color, type } = req.body.query;

  let parsedQuery = {};

  if (name) {
    if (typeof name === "string") {
    parsedQuery.name = name;
  } else {
    throw new httpError.BadRequest("Field 'name' should be of string type");
  }
  }

  if (color) {
    if (typeof color === "string") {
    parsedQuery.color = color;
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
    parsedQuery.type = type;
  }

  if (!name && !color && !type) {
    throw new httpError.BadRequest(
      `Fields 'name', 'color' or 'type' is mandatory in the request`
    );
  }

  Reflect.set(req.body, "query", parsedQuery);

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["query"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller
],
controller);

const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const { searchCategory } = require("./categories.service");
const pagination = require("../middlewares/pagination");

async function controller(req, res) {
  const { name, color, type, pageNo, pageSize } = req.query;

  let searchCategoryParams = {};
  if (name) {
    searchCategoryParams.name = name;
  }
  if (color) {
    searchCategoryParams.color = color;
  }
  if (type) {
    searchCategoryParams.type = type;
  }

  const result = await searchCategory(searchCategoryParams, pageNo, pageSize);

  res.json({
    message: "Categories found",
    data: result,
  });
}

function validateParams(req, res, next) {
  let { name, color, type } = req.query;

  if (name) {
    if (typeof name !== "string") {
      throw new httpError.BadRequest("Field 'name' should be of string type");
    }
  }

  if (color) {
    if (typeof color === "string") {
      throw new httpError.BadRequest("Field 'color' should be of string type");
    }
  }

  if (type) {
    if (typeof type !== "string") {
      throw new httpError.BadRequest("Field 'type' should be of string type");
    }
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
  validateParams,
  pagination,
  controller,
]);

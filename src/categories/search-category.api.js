const httpError = require("http-errors");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const searchCategoryForUser = require("./categories.service");

async function controller(req, res) {
  let { searchCategory } = req.body;

  const result = await searchCategoryForUser({ searchCategory });

  if (!result) {
    res.json({
      message: "No categories found for the respective search",
    });
  } else {
    res.json({
      message: "Categories found",
      data: result._id,
    });
  }
}

function validateParams(req, res, next) {
  const errorTypedFields = ["color", "name", "type"].filter(
    (field) => typeof Reflect.get(req.body, "field") !== "string"
  );

  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(",")}' should be of string type`
    );
  }

  let { name, color, type } = req.body.searchCategory;

  let parsedSearchCategory = {};

  if (name) {
    parsedSearchCategory.name = name;
  }

  if (color) {
    parsedSearchCategory.color = color;
  }

  if (type) {
    parsedSearchCategory.type = type;
  }

  if (!name && !color && !type) {
    throw new httpError.BadRequest(
      `Fields 'name', 'color' or 'type' is mandatory in the request`
    );
  }

  Reflect.set(req.body, "searchCategory", "parsedSearchCategory");

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  "searchCategory",
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler(controller, [
  userResolver,
  missingParamsValidator,
  validateParams,
]);

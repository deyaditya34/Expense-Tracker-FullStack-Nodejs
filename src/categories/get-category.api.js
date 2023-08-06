const httpError = require("http-errors");
const { getCategory } = require("./categories.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const pagination = require("../middlewares/pagination");

async function controller(req, res) {
  const {id}  = req.params;
  const {pageNo, pageSize} = req.query;  
  console.log("id -", id, "pageNo -", pageNo, "pageSize -", pageSize)

  const result = await getCategory(id, pageNo, pageSize);

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
    (field) => typeof Reflect.get(req.params, field) !== "string"
  );

  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(",")}' should be of string type`
    );
  }

  next();
}

module.exports = buildApiHandler([
  userResolver,
  validateParams,
  pagination,
  controller,
]);

const { findUsers } = require("./auth.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");
const checkAdminRights = require("../middlewares/check-admin-rights");
const paramsValidator = require("../middlewares/params-validator");

async function controller(req, res) {
  const { query } = req.body;

  const result = await findUsers({ ...query, role: { $ne: "ADMIN" } });

  if (result.length === 0) {
    res.json({
      message: "No User Found",
    });
  } else {
    res.json({
      message: "Users Found",
      data: result,
    });
  }
}

function validateParams(req, res, next) {
  const { username } = req.body.query;

  let parsedQuery = {};

  if (typeof username === "string") {
    parsedQuery.username = { $regex: username };
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
  checkAdminRights,
  missingParamsValidator,
  validateParams,
  controller,
]);

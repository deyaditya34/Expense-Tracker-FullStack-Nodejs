const httpError = require("http-errors");

const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const {
  createCategory,
  getCategoryByNameAndType,
} = require("./categories.service");

async function controller(req, res) {
  let { name, type, user } = req.body;

  const result = await createCategory({ name, type, user: user.username });

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
  const { user } = req.body;

  const errorTypedFields = ["name", "type"].filter(
    (field) => typeof Reflect.get(req.body, field) !== "string"
  );

  if (errorTypedFields.length > 0) {
    throw new httpError.BadRequest(
      `Field '${errorTypedFields.join(", ")}' should be of string type`
    );
  }

  let { type, name } = req.body;

  if (type !== "debit" && type !== "credit") {
    throw new httpError.BadRequest(
      `Field 'type' should be either 'debit' or 'credit'`
    );
  }

  const regexName = new RegExp(`\\b${name}\\b`, "i");

  const getCategory = await getCategoryByNameAndType(
    {
      name: { $regex: regexName },
      type: type,
    },
    user.username
  );

  if (getCategory) {
    throw new httpError.BadRequest(`Category '${name}' already exists.`);
  }

  next();
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["name", "type"],
  paramsValidator.PARAM_KEY.BODY
);

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

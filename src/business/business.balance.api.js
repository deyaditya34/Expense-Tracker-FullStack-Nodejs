const httpError = require("http-errors");

const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const paramsValidator = require("../middlewares/params-validator");
const businessService = require("./business.service");

async function controller(req, res) {
  const { dateTo, dateFrom } = req.query;
  
  console.log("req.query -", req.query);
  
  const businessBalance = await businessService.getBusinessBalance(
    dateTo,
    dateFrom
  );

  res.json({
    success: true,
    data: businessBalance,
  });
}

const missingParamsValidator = paramsValidator.createParamValidator(
  ["dateFrom", "dateTo"],
  paramsValidator.PARAM_KEY.QUERY
);

function validateParams(req, res, next) {
  const { dateTo, dateFrom } = req.query;

  if (typeof dateTo !== "string") {
    throw new httpError.BadRequest(
      `Field 'dateTo' - '${dateTo}' should be 'string' type.`
    );
  } else if (!new Date(dateTo).valueOf() > 0) {
    throw new httpError.BadRequest(
      `invalid 'dateTo' - '${dateTo}', should be either in format 'year-month-day' or 'month-day-year' `
    );
  }

  if (typeof dateFrom !== "string") {
    throw new httpError.BadRequest(
      `Field 'dateFrom' - '${dateFrom}' should be 'string' type.`
    );
  } else if (!new Date(dateFrom).valueOf() > 0) {
    throw new httpError.BadRequest(
      `invalid 'dateFrom' - '${dateFrom}', should be either in format 'year-month-day' or 'month-day-year' `
    );
  }

  next();
}

module.exports = buildApiHandler([
  userResolver,
  missingParamsValidator,
  validateParams,
  controller,
]);

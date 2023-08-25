// const httpError = require("http-errors");
const getBusiness = require("./business.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
// const paramsValidator = require("../middlewares/params-validator");


async function controller(req, res) {
  let result = await getBusiness();

  res.json({
    message: `Details about the business`,
    data: result, 
  })
}

module.exports = buildApiHandler([userResolver, controller]);
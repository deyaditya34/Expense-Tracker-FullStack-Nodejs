
const getBusiness = require("./business.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");



async function controller(req, res) {
  let result = await getBusiness();

  res.json({
    message: `Details about the business`,
    data: result, 
  })
}

module.exports = buildApiHandler([userResolver, controller]);
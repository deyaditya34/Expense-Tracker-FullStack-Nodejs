const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const getAllCategoriesForUser = require("./categories.service");

async function controller(req, res, next) {
  let result = await getAllCategoriesForUser();

  if (!result) {
    res.json({
      message: "No categories stored in the application to display"
    })
  } else {
    res.json({
      message: "Displayed categories below",
      data: result,
    })
  }
}

module.exports = buildApiHandler(controller, [userResolver]);
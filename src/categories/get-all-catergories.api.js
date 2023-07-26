const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const {getAllCategories} = require("./categories.service");

async function controller(req, res) {
  let result = await getAllCategories();
  console.log("result is", result);
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

module.exports = buildApiHandler([controller], [userResolver]);
const { getCategory } = require("./categories.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const {id}  = req.params;
  const result = await getCategory(id);

  if (!result) {
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

module.exports = buildApiHandler([
  userResolver,
  controller,
]);

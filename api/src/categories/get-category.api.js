const { getCategory } = require("./categories.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const {id}  = req.params;
  const {user} = req.body;
  
  const result = await getCategory(id, user.username);

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

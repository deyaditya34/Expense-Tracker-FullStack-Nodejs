const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const { deleteCategory } = require("./categories.service");
const checkAdminRights = require("../middlewares/check-admin-rights");

async function controller(req, res) {
  const { id } = req.params;

  const result = await deleteCategory(id);

  if (!result) {
    res.json({
      message: "No category available to delete",
    });
  } else {
    res.json({
      message: "Category Deleted",
      data: result.deletedCount,
    });
  }
}

module.exports = buildApiHandler([userResolver, checkAdminRights, controller]);

const {getAllUsers} = require("./auth.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");
const checkAdminRights = require("../middlewares/check-admin-rights");


async function controller(req, res) {
  const result = await getAllUsers();

  if (!result) {
    res.json({
      message: "NO User Found"
    })
  } else {
    res.json({
      message: "Users Found",
      data: result,
    })
  }
}

module.exports = buildApiHandler([controller], [userResolver, checkAdminRights]);
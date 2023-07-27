const buildApiHandler = require("../api-utils/build-api-handler");
const httpError = require("http-errors");
const {getAllUsers} = require("./auth.service");
const userResolver = require("../middlewares/user-resolver");

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

module.exports = buildApiHandler([controller]);
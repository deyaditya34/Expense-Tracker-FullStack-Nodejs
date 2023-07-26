const buildApiHandler = require("../api-utils/build-api-handler");
const paramsValidator = require("../middlewares/params-validator");
const userResolver = require("../middlewares/user-resolver");
const { getAllTransactions } = require("./transactions.service");
const httpError = require("http-errors");

async function controller(req, res) {
  const result = await getAllTransactions();

  if (result.length === 0) {
    res.json({
      message: "No transactions found for the user",
    });
  } else {
    res.json({
      message: "transactions found",
      data: result
    })
  }
}

module.exports = buildApiHandler([controller], [userResolver])

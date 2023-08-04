const buildApiHandler = require("../api-utils/build-api-handler");
const pagination = require("../middlewares/pagination");
const userResolver = require("../middlewares/user-resolver");
const { getAllTransactions } = require("./transactions.service");


async function controller(req, res) {
  const { pageNo, pageSize } = req.query;
  
  const result = await getAllTransactions(pageNo, pageSize);

  if (result.length === 0) {
    res.json({
      message: "No transactions found for the user",
    });
  } else {
    res.json({
      message: "transactions found",
      data: result,
    });
  }
}

module.exports = buildApiHandler([userResolver, pagination, controller]);

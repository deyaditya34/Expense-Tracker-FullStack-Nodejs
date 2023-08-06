const pagination = require("../middlewares/pagination");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");
const { searchTransaction } = require("../transactions/transactions.service");
const { getCategory } = require("../categories/categories.service");
const { ObjectId } = require("mongodb");

async function controller(req, res) {
  const { id } = req.params;
  const { pageNo, pageSize } = req.query;

  const resultFromGetCategory = await getCategory(id);

  if (resultFromGetCategory.length === 0) {
    res.json({
      message: "No category found for the id",
    });
  }

  const resultFromSearchTransaction = await searchTransaction(
    { "category._id": new ObjectId(id) },
    pageNo,
    pageSize
  );

  if (resultFromSearchTransaction.length === 0) {
    res.json({
      message: `No transactions stored in the category Id '${id}'`,
    });
  } else {
    res.json({
      message: `Transactions for the category Id '${id}'`,
      data: resultFromSearchTransaction,
    });
  }
}

module.exports = buildApiHandler([userResolver, pagination, controller]);

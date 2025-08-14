const { getTransaction } = require("./transactions.service");
const userResolver = require("../middlewares/user-resolver");
const buildApiHandler = require("../api-utils/build-api-handler");

async function controller(req, res) {
  const { id } = req.params;
  const {user} = req.body;

  const result = await getTransaction(id, user.username);

  if (!result) {
    res.json({
      message: `No transaction found for the id '${id}'`,
    });
  } else {
    res.json({
      message: "Transaction found",
      data: result,
    });
  }
}

module.exports = buildApiHandler([userResolver, controller]);

const buildApiHandler = require("../api-utils/build-api-handler");
const eventBridge = require("../events/event.service");
const userResolver = require("../middlewares/user-resolver");
const transactionService = require("./transactions.service");
const config = require("../config");

async function controller(req, res) {
  const { id } = req.params;

  const existingTransaction = await transactionService.getTransaction(id);

  if (!existingTransaction) {
    res.json({
      success: false,
      message: `No transaction found to delete for the id - '${id}'`,
    });
  } else {
    
    if (existingTransaction.type === "debit") {
      existingTransaction.type = "credit"
    } else {
      existingTransaction.type = "debit"
    }
    console.log("existingTransaction -", existingTransaction)
    eventBridge.emit(
      config.EVENT_NAMES_TRANSACTIONS_CREATED,
      existingTransaction.type,
      existingTransaction.amount
    );

    await transactionService.deleteTransaction(id);

    res.json({
        success: true,
        message: `transaction deleted for the id - ${id}`
    })
  }
}

module.exports = buildApiHandler([userResolver, controller]);

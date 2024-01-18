const database = require("../services/database.service");
const env = require("../middlewares/env-resolver");
const eventBridge = require("../events/event.service");

function getBusiness() {
  return database.getCollection(env.result.COLLECTION_NAMES_BUSINESS).find({}).toArray();
}

async function registerTransaction(type, amount) {
  let incBy = amount;
  if (type === "DEBIT") {
    incBy = -amount;
  }
  await database
    .getCollection(env.result.COLLECTION_NAMES_BUSINESS)
    .updateOne({}, { $inc: { balance: incBy } });

  return database.getCollection(env.result.COLLECTION_NAMES_BUSINESS).findOne({});
}

eventBridge.addListener(env.result.EVENT_NAMES_TRANSACTIONS_CREATED, registerTransaction);

module.exports = { getBusiness, registerTransaction };

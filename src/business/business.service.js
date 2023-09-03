const database = require("../services/database.service");
const { COLLECTION_NAMES, EVENT_NAMES } = require("../config");
const eventBridge = require("../events/event.service");

function getBusiness() {
  return database.getCollection(COLLECTION_NAMES.BUSINESS).find({}).toArray();
}

async function registerTransaction(type, amount) {
  let incBy = amount;
  if (type === "DEBIT") {
    incBy = -amount;
  }
  await database
    .getCollection(COLLECTION_NAMES.BUSINESS)
    .updateOne({}, { $inc: { balance: incBy } });

  return database.getCollection(COLLECTION_NAMES.BUSINESS).findOne({});
}

eventBridge.addListener(EVENT_NAMES.TRANSACTION_CREATED, registerTransaction);

module.exports = { getBusiness, registerTransaction };

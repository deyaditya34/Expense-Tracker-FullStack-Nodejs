const config = require("../config");
const database = require("../services/database.service");
const eventBridge = require("../events/event.service");

function getBusiness() {
  return database
    .getCollection(config.COLLECTION_NAMES_BUSINESS)
    .find({})
    .toArray();
}

async function registerTransaction(type, amount) {
  let incBy = amount;
  if (type === "credit") {
    incBy = -amount;
  }

  await database
    .getCollection(config.COLLECTION_NAMES_BUSINESS)
    .updateOne({}, { $inc: { balance: incBy } });

  return database.getCollection(config.COLLECTION_NAMES_BUSINESS).findOne({});
}

async function getBusinessBalance(dateTo, dateFrom) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCashInflow: { $sum: "$cashInflow" },
          totalCashOutflow: { $sum: "cashOutflow" },
          totalBankInflow: { $sum: "bankInflow" },
          totalBankOutflow: { $sum: "$bankOutflow" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCashBalance: {
            $subtract: ["$totalCashInflow", "$totalCashOutflow"],
          },
          totalBankBalance: {
            $subtract: ["$totalBankInflow", "$totalBankOutflow"],
          },
        },
      },
    ])
    .toArray();
}

async function getBusinessProfit(dateTo, dateFrom) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCredit: {
            $sum: {
              $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          profit: { $subtract: ["$totalDebit", "$totalCredit"] },
        },
      },
    ]).toArray();
}

eventBridge.addListener(
  config.EVENT_NAMES_TRANSACTIONS_CREATED,
  registerTransaction
);

module.exports = { getBusiness, registerTransaction, getBusinessBalance, getBusinessProfit };

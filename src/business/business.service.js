const config = require("../config");
const database = require("../services/database.service");
const eventBridge = require("../events/event.service");

const adjustToUTC = (dateStr, endOfDay = false) => {
  const date = new Date(dateStr);
  if (endOfDay) {
    date.setUTCHours(23, 59, 59, 999);
  } else {
    date.setUTCHours(0, 0, 0, 0);
  }
  return date.toISOString();
};

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

async function getBusinessBalance(dateTo, dateFrom, username) {
  const results = await database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .aggregate([
      {
        $match: {
          date: {
            $gte: adjustToUTC(dateFrom),
            $lte: adjustToUTC(dateTo, true),
          },
          createdBy: { $eq: username },
        },
      },
      {
        $group: {
          _id: null,
          totalCashInflow: { $sum: "$cashInflow" },
          totalCashOutflow: { $sum: "$cashOutflow" },
          totalBankInflow: { $sum: "$bankInflow" },
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

  if (!results.length) {
    return {
      totalCashBalance: 0,
      totalBankBalance: 0,
    };
  }

  return results[0];
}

async function getBusinessProfit(dateTo, dateFrom, username) {
  const results = await database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .aggregate([
      {
        $match: {
          date: {
            $gte: adjustToUTC(dateFrom),
            $lte: adjustToUTC(dateTo, true),
          },
          createdBy: { $eq: username },
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
    ])
    .toArray();

  if (!results.length) {
    return {
      profit: 0,
    };
  }

  return results[0];
}

eventBridge.addListener(
  config.EVENT_NAMES_TRANSACTIONS_CREATED,
  registerTransaction
);

module.exports = {
  getBusiness,
  registerTransaction,
  getBusinessBalance,
  getBusinessProfit,
};

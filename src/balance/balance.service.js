const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

function getBalance() {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .aggregate([
      {
        $group: {
          _id: "$type",
          totalValue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: false,
          type: "$_id",
          amount: "$totalValue",
        },
      },
    ])
    .toArray();
}

function createBalance(balance) {
  return database.getCollection(COLLECTION_NAMES.BUSINESS).insertOne(balance);
}

function updateBalance(balance) {
  database
    .getCollection(COLLECTION_NAMES.BUSINESS)
    .updateOne(
      { _id: new ObjectId("64e72a79e5e1b5e0237e6b33") },
      { $inc: { amount: balance } }
    );

  return database.getCollection(COLLECTION_NAMES.BUSINESS)
  .findOne({_id: new ObjectId("64e72a79e5e1b5e0237e6b33")});

}

module.exports = { getBalance, createBalance, updateBalance };

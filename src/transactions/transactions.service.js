// get transaction
// list transactions
// create transaction
const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

let transaction = {
  type: "DEBIT",
  amount: 550,
  category: {
    _id: "64b911e8e02c43d67aa5e7a8",
  },
  date: "2023-07-20T16:01:37.204Z",
};

function createTransaction(transactionDetails) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .insertOne(transactionDetails);
}

function getAllTransactions() {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .find({})
    .toArray();
}

function getTransaction(transactionId) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .find({ _id: new ObjectId(transactionId) })
    .toArray();
}

function searchTransaction(transactionDetails) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .find(transactionDetails)
    .toArray();
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  searchTransaction,
};

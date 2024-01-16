
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
  console.log("transactionDetails", transactionDetails);
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .insertOne(transactionDetails);
}

function getAllTransactions(pageNo, pageSize) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getTransaction(transactionId) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .findOne({ _id: new ObjectId(transactionId) });
}

function searchTransaction(transactionDetails, username, pageNo, pageSize) {
  return database
    .getCollection(COLLECTION_NAMES.TRANSACTIONS)
    .find(transactionDetails, { username: { $eq: username } })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  searchTransaction,
};

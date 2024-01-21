const { ObjectId } = require("mongodb");
const database = require("../services/database.service");

function createTransaction(transactionDetails) {
  console.log("transactionDetails", transactionDetails);
  return database
    .getCollection(process.env.COLLECTION_NAMES_TRANSACTIONS)
    .insertOne(transactionDetails);
}

function getAllTransactions(pageNo, pageSize) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_TRANSACTIONS)
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getTransaction(transactionId) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_TRANSACTIONS)
    .findOne({ _id: new ObjectId(transactionId) });
}

function searchTransaction(transactionDetails, username, pageNo, pageSize) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_TRANSACTIONS)
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

const { ObjectId } = require("mongodb");
const config = require("../config");
const database = require("../services/database.service");

function createTransaction(transactionDetails) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .insertOne(transactionDetails);
}

function getAllTransactions(username, pageNo, pageSize) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .find({ createdBy: { $eq: username } })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getTransaction(transactionId, username) {
  if (!ObjectId.isValid(transactionId)) {
    return false;
  }

  return database.getCollection(config.COLLECTION_NAMES_TRANSACTIONS).findOne({
    _id: new ObjectId(transactionId),
    createdBy: { $eq: username },
  });
}

function searchTransaction(transactionDetails, username, pageNo, pageSize) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .find({ ...transactionDetails, createdBy: { $eq: username } })
    .sort({ date: -1 })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function searchPendingTransaction(
  transactionDetails,
  username,
  pageNo,
  pageSize
) {
  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .find({ ...transactionDetails, createdBy: { $eq: username } })
    .sort({ date: -1 })
    .project({ date: 1, paymentDue: 1, notes: 1 })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function deleteTransaction(id, username) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  return database
    .getCollection(config.COLLECTION_NAMES_TRANSACTIONS)
    .deleteOne({ _id: new ObjectId(id), createdBy: { $eq: username } });
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  searchTransaction,
  deleteTransaction,
  searchPendingTransaction,
};

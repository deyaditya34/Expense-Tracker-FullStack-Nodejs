const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

function createCategory(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .insertOne(categoryDetails);
}

function getAllCategories(pageNo, pageSize) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function searchCategory(searchCategory, pageNo, pageSize) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find(searchCategory)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getCategory(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({ _id: new ObjectId(id) })
    .toArray();
}

function deleteCategory(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .deleteOne({ _id: { $in: [new ObjectId(id)] } });
}

function getCategoryTransactions(id, pageNo, pageSize) {
  return database.getCollection(COLLECTION_NAMES.TRANSACTIONS).find({});
}

module.exports = {
  createCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  deleteCategory,
};

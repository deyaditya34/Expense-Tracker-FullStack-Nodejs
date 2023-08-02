const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

function createCategory(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .insertOne(categoryDetails);
}

function getAllCategories(pageNo, limit) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({})
    .skip((pageNo-1)*limit)
    .limit(limit)
    .toArray();
}

function searchCategory(searchCategory, pageNo, limit) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find(searchCategory)
    .skip((pageNo-1)*limit)
    .limit(limit)
    .toArray();
}

function getCategory(id, pageNo, limit) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({ _id: { $in: [new ObjectId(id)] } })
    .skip((pageNo-1)*limit)
    .limit(limit)
    .toArray();
}

function deleteCategory(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .deleteOne({ _id: { $in: [new ObjectId(id)] } });
}

module.exports = {
  createCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  deleteCategory,
};

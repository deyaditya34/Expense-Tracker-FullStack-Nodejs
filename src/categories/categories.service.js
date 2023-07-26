const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

function createCategory(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .insertOne(categoryDetails);
}

function getAllCategories() {
  return database.getCollection(COLLECTION_NAMES.CATEGORIES).find({}).toArray();
}

function searchCategory(searchCategory) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find(searchCategory)
    .toArray();
}

function getCategory(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({ _id: { $in: [new ObjectId(id)] } })
    .toArray();
}

function deleteCategory(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .deleteOne({ _id: {$in: [new ObjectId(id)]} });
}

module.exports = {
  createCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  deleteCategory,
};

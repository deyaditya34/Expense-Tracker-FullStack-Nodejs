const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectId } = require("mongodb");

function createCategoryForUser(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .insertOne({ ...categoryDetails });
}

function getAllCategoriesForUser() {
  return database.getCollection(COLLECTION_NAMES.CATEGORIES).find({}).toArray();
}

function searchCategoryForUser(searchCategory) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({ ...searchCategory })
    .toArray();
}

function getCategoryForUser(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({ _id: new ObjectId(id) })
    .toArray();
}

function deleteCategoryForUser(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  createCategoryForUser,
  getAllCategoriesForUser,
  searchCategoryForUser,
  getCategoryForUser,
  deleteCategoryForUser,
};

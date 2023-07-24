const database = require("../services/database.service");
const { COLLECTION_NAMES } = require("../config");
const { ObjectID } = require("mongodb");

console.log("")
function createCategoryForUser(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .insertOne({ ...categoryDetails});

}

function getAllCategoriesForUser() {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({})
    .toArray();
}

function searchCategoryForUser(categoryDetails) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({...categoryDetails})
    .toArray();
}

function getCategoryForUser(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .find({_id: new ObjectID(id)})
    .toArray();;
}

function deleteCategoryForUser(id) {
  return database
    .getCollection(COLLECTION_NAMES.CATEGORIES)
    .delete({_id: new ObjectID(id)})
}

module.exports = {
  createCategoryForUser,
  getAllCategoriesForUser,
  searchCategoryForUser,
  getCategoryForUser,
  deleteCategoryForUser
}

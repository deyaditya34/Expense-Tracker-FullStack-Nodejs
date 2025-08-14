const config = require("../config");
const database = require("../services/database.service");
const { ObjectId } = require("mongodb");

function createCategory(categoryDetails) {
  return database
    .getCollection(config.COLLECTION_NAMES_CATEGORIES)
    .insertOne(categoryDetails);
}

function getAllCategories(pageNo, pageSize, username) {
  return database
    .getCollection(config.COLLECTION_NAMES_CATEGORIES)
    .find({ user: username })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function searchCategory(searchCategory, username, pageNo, pageSize) {
  return database
    .getCollection(config.COLLECTION_NAMES_CATEGORIES)
    .find({ ...searchCategory, user: { $eq: username } })
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getCategoryByNameAndType(categoryDetails, username) {
  return database
    .getCollection(config.COLLECTION_NAMES_CATEGORIES)
    .findOne({ ...categoryDetails, user: { $eq: username } });
}

function getCategory(id, username) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  return database
    .getCollection(config.COLLECTION_NAMES_CATEGORIES)
    .findOne({ _id: new ObjectId(id), user: { $eq: username } });
}

function deleteCategory(id, username) {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  return database.getCollection(config.COLLECTION_NAMES_CATEGORIES).deleteOne({
    _id: { $in: [new ObjectId(id)] },
    user: { $eq: username },
  });
}

module.exports = {
  createCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  deleteCategory,
  getCategoryByNameAndType,
};

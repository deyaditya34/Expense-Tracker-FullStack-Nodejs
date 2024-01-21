const database = require("../services/database.service");
const { ObjectId } = require("mongodb");

function createCategory(categoryDetails) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .insertOne(categoryDetails);
}

function getAllCategories(pageNo, pageSize) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function searchCategory(searchCategory, pageNo, pageSize) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .find(searchCategory)
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .toArray();
}

function getCategoryByName(categoryName) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .findOne(categoryName);
}

function getCategory(id) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .findOne({ _id: new ObjectId(id) })
}

function deleteCategory(id) {
  return database
    .getCollection(process.env.COLLECTION_NAMES_CATEGORIES)
    .deleteOne({ _id: { $in: [new ObjectId(id)] } });
}

module.exports = {
  createCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  deleteCategory,
  getCategoryByName, 
};

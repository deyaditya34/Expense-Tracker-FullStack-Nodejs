const express = require("express");

const createCategoryForUser = require("./create-category.api");
const deleteCategoryForUser = require("./delete-category.api");
const getAllCategoriesForUser = require("./get-all-catergories.api");
const getCategoryForUser = require("./get-category.api");
const searchCatergoryForUser = require("./search-category.api");

const router = express.Router();

router.post("/", createCategoryForUser);


module.exports = router;
const express = require("express");

const getCategoryForUser = require("./get-category.api");
const createCategoryForUser = require("./create-category.api");
const deleteCategoryForUser = require("./delete-category.api");
const searchCatergoryForUser = require("./search-category.api");
const getAllCategoriesForUser = require("./get-all-catergories.api");

const router = express.Router();

router.get("/", getCategoryForUser);
router.post("/", createCategoryForUser);
router.delete("/", deleteCategoryForUser);
router.get("/all", getAllCategoriesForUser);
router.get("/search", searchCatergoryForUser);

module.exports = router;

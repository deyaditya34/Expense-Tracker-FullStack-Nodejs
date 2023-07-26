const express = require("express");

const getCategory = require("./get-category.api");
const createCategory = require("./create-category.api");
const deleteCategory = require("./delete-category.api");
const searchCatergory = require("./search-category.api");
const getAllCategories = require("./get-all-catergories.api");

const router = express.Router();

router.get("/", getCategory);
router.post("/", createCategory);
router.delete("/", deleteCategory);
router.get("/all", getAllCategories);
router.get("/search", searchCatergory);

module.exports = router;

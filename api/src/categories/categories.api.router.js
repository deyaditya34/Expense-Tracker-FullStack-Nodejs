const express = require("express");

const getCategory = require("./get-category.api");
const createCategory = require("./create-category.api");
const deleteCategory = require("./delete-category.api");
const searchCatergory = require("./search-category.api");

const router = express.Router();

router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.get("/", searchCatergory);
router.get("/:id", getCategory);

module.exports = router;

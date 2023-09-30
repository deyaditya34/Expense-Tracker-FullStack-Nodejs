const express = require("express");

const createTransaction = require("./create-transaction.api");
const getTransaction = require("./get-transaction.api");
const searchTransaction = require("./search-transaction.api");

const router = express.Router();

router.post("/", createTransaction);
router.get("/:id", getTransaction);
router.get("/", searchTransaction);

module.exports = router;

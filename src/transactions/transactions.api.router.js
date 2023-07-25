const express = require("express");

const createTransactionForUser = require("./create-transaction.api")
const getTransactionsForUser = require("./get-all-transactions.api")
const getTransactionForUser = require("./get-transaction.api");
const searchTransactionForUser = require("./search-transaction.api")

const router = express.Router();

router.post("/", createTransactionForUser);
router.get("/all", getTransactionsForUser);
router.get("/", getTransactionForUser);
router.get("/search", searchTransactionForUser);


module.exports = router;
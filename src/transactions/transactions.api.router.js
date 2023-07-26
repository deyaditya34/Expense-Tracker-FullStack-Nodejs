const express = require("express");

const createTransaction = require("./create-transaction.api")
const getTransactions = require("./get-all-transactions.api")
const getTransaction = require("./get-transaction.api");
const searchTransaction = require("./search-transaction.api")

const router = express.Router();

router.post("/", createTransaction);
router.get("/all", getTransactions);
router.get("/", getTransaction);
router.get("/search", searchTransaction);


module.exports = router;
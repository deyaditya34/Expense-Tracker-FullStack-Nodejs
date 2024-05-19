const express = require("express");

const createTransaction = require("./create-transaction.api");
const getTransaction = require("./get-transaction.api");
const searchTransaction = require("./search-transaction.api");
const deleteTransaction = require("./delete-transactiona.api");

const router = express.Router();

router.post("/", createTransaction);
router.get("/", searchTransaction);
router.get("/:id", getTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;

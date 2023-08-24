const express = require("express");

const getBalance = require("./get-balance.api");
const createBalance = require("./create-balance.api");
const updateBalance = require("./update-balance.api");
const router = express.Router();

router.get("/", getBalance);
router.post("/", createBalance);
router.post("/update", updateBalance);

module.exports = router;

const express = require("express");

const getBusiness = require("./get-business.api");
const businessBalance = require("./business.balance.api")


const router = express.Router();


router.get("/", getBusiness);
router.get("/balance", businessBalance)


module.exports = router;
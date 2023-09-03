const express = require("express");

const getBusiness = require("./get-business.api");

const router = express.Router();


router.get("/", getBusiness);



module.exports = router;
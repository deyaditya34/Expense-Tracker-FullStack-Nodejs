
const express = require("express");

const loginUser = require("./auth.login.api");
const registerUser = require("./auth.register.api");
const getAllUsers = require("./get-all-users.api")

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
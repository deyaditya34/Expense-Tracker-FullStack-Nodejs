
const express = require("express");

const loginUser = require("./auth.login.api");
const registerUser = require("./auth.register.api");
const queryUsers = require("./query-users.api");
const changePassword = require("./password.change.api")

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", queryUsers);
router.post("/changePassword", changePassword);

module.exports = router;
const express = require("express");
const axios = require('axios');
const queryString = require('querystring');
const path = require("path");

const config = require("../config");
const loginUser = require("./auth.login.api");
const registerUser = require("./auth.register.api");
const queryUsers = require("./query-users.api");
const changePassword = require("./password.change.api")
const logoutUser = require("./auth.logout.api");
const checkAuth = require("./auth.checkAuth.api");
const loginGoogleUser = require("./auth.login.google.api");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", queryUsers);
router.post("/changePassword", changePassword);
router.post("/logout", logoutUser);
router.get("/check-token", checkAuth);
router.use('/static', express.static('frontEnd'));
router.get('/google/callback', loginGoogleUser);

module.exports = router;

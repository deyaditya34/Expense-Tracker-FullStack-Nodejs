
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

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", queryUsers);
router.post("/changePassword", changePassword);
router.post("/logout", logoutUser);
router.get("/check-token", checkAuth);
router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const token = req.query.token;
    console.log("code:", code);
    console.log('OAuth state:', state);

//    if (!code) {
 //     return res.status(400).send('Missing code from Google.');
  //  }

    try {
      const tokenRes = await axios.post(
        'https://oauth2.googleapis.com/token',
        queryString.stringify({
          code,
          client_id: config.GOOGLE_CLIENT_ID,
          client_secret: config.GOOGLE_CLIENT_SECRET,
          redirect_uri: config.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      const tokenData = tokenRes.data;
      console.log('Google token data:', tokenData);

      const userRes = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }
      );

      const userData =  userRes.data;
      console.log('Google user data:', userData);
      

      return res.redirect("/main.html");
//      res.json({ success: true, user: userData });
    } catch (err) {
      console.error(err);
      res.status(500).send('OAuth error');
    }
  });
router.use('/static', express.static('frontEnd'));  

module.exports = router;

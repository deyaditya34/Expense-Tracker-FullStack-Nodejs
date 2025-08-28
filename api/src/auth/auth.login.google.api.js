const axios = require("axios");
const queryString = require("querystring");

const authService = require("./auth.service");
const buildApiHandler = require("../api-utils/build-api-handler");
const config = require("../config");
const jwtService = require("../services/jwt.service");

async function controller(req, res) {
    const client_id = config.GOOGLE_CLIENT_ID;
    const client_secret = config.GOOGLE_CLIENT_SECRET;
    const redirect_uri = config.GOOGLE_REDIRECT_URI;
    const code = req.query.code;
    const state = req.query.state;
    const scope = req.query.scope;

    // Exchanging the authorization code in return for id token, refresh token,
    // access token etc.
    const token_response = await axios({
        method: "post",
        url: "https://oauth2.googleapis.com/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: queryString.stringify({
            code,
            client_id,
            client_secret,
            redirect_uri,
            grant_type: "authorization_code"
        })
    })

    const token_data = token_response.data;
    
    // Verifying the id_token directly with google token info endpoint for
    // simpler implementation instead of manual verification which will tried
    // later
    const id_token_verify_response = await axios({
        method: "get",
        url: "https://oauth2.googleapis.com/tokeninfo",
        params: {
            id_token: token_data.id_token
        }
    })

    const id_token_verify_data = id_token_verify_response.data;

    console.log("id token verify data -", id_token_verify_data);

    // Fetching the user details after the id_token is verified.
    const user_data_response = await axios({
        method: "get",
        url: "https://openidconnect.googleapis.com/v1/userinfo",
        headers: { Authorization: `Bearer ${token_data.access_token}` }
    })

    const user_data = user_data_response.data;

    const user_registerd = await authService.checkUserRegistered(user_data.sub, "google")
    
    if (!user_registerd) {
        await authService.register(user_data.sub, "", "google")
    }

    const token = jwtService.createToken({username: user_data.sub});

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    //    const google_public_keys_response = await axios({
    //           method: "get",
    //     url: "https://www.googleapis.com/oauth2/v3/certs"
    //      })

    //    const google_keys_data = google_public_keys_response.data;

    //    console.log("google keys response -->", google_keys_data);
    res.redirect("/main.html")

}

/**
 * user data --> {
  sub: '117478934946394345825',
  name: 'Aditya Dey',
  given_name: 'Aditya',
  family_name: 'Dey',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocIh9dpAWHFXrvzNHZPPqDOc1koKpqd7rMQg2aAgoJFjIoOup-VH=s96-c',
  email: 'deyaditya34@gmail.com',
  email_verified: true
}*/

module.exports = buildApiHandler([controller])

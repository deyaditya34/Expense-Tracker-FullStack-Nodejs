const jwt = require("jsonwebtoken");
const env = require("../middlewares/env-resolver")
const config = require("../config");


function createToken(payload) {
    const token = jwt.sign(payload, env.result.JWT_SECRET);

    return token;
}

function decodeToken(token) {
    try {
        return jwt.verify(token, env.result.JWT_SECRET);
    } catch (err) {
        console.log("Invalid Token", token);
        return null;
    }
}

module.exports = {
    createToken,
    decodeToken
}

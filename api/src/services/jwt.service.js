const jwt = require("jsonwebtoken");
const config = require("../config")

function createToken(payload) {
    const token = jwt.sign(payload, config.JWT_SECRET);

    return token;
}

function decodeToken(token) {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        console.log("Invalid Token", token);
        return null;
    }
}

module.exports = {
    createToken,
    decodeToken
}

const jwt = require("jsonwebtoken");

function createToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
}

function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log("Invalid Token", token);
        return null;
    }
}

module.exports = {
    createToken,
    decodeToken
}

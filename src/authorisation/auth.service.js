const {scryptSync} = require("crypto");
const httpError = require("http-errors");
const database = require("../services/database.service");
const jwtService = require("../services/jwt.service");
const {COLLECTION_NAMES, PASSWORD_SALT} = require("../config");


async function register(username, password) {
    const existingUser = await database
        .getCollection(COLLECTION_NAMES.USERS)
        .findOne({
            username
        })
    console.log("existing user", existingUser);    
    if (existingUser) {
        throw new httpError.UnprocessableEntity(
            `Username '${username}' is already taken`
        )
    }

    await database.getCollection(COLLECTION_NAMES.USERS).insertOne({
        username,
        password: encryptPassword(password),
        role: "USER"
    })
}

function encryptPassword(password) {
    return scryptSync(password, PASSWORD_SALT, 64).toString("hex");
}

async function login(username, password) {
    const user = await database.getCollection(COLLECTION_NAMES.USERS).findOne({
        username,
        password: encryptPassword(password)
    })

    if (!user) {
        throw new httpError.Unauthorized("Username/Password combo incorrect")
    }

    const token = jwtService.createToken({username});

    return token;
}

async function getUserFromToken(token) {
    const payload = jwtService.decodeToken(token);

    if(!payload) {
        return null;
    }

    const username = payload.username;
    const user = await database.getCollection(COLLECTION_NAMES.USERS)
    .findOne({username}, {projection : {_id: false, password: false}});

    return user;
}

function getAllUsers() {
    return database.getCollection(COLLECTION_NAMES.USERS)
    .find({ role: {$ne : "ADMIN"}})
    .toArray()
}

module.exports = {
    register,
    login,
    getUserFromToken,
    getAllUsers
}
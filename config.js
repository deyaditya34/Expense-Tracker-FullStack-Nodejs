const MONGOURI = "mongodb://127.0.0.1:27018";
const DB_NAME = "expense-tracker";

const APP_PORT = 3000;

const COLLECTION_NAMES = {
    USERS: "users",
    TRANSACTIONS: "transactions"
}

const JWT_SECRET = "Bokakhat@123";

const AUTH_TOKEN_HEADER_FIELD = "token";

const PASSWORD_SALT = "Bokakhat@123";

module.exports = {
    MONGOURI,
    DB_NAME,
    APP_PORT,
    COLLECTION_NAMES,
    JWT_SECRET,
    AUTH_TOKEN_HEADER_FIELD,
    PASSWORD_SALT
}
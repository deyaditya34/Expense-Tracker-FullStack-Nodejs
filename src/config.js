const MONGOURI = "mongodb://127.0.0.1:27017";
const DB_NAME = "expense-tracker";

const APP_PORT = 3090;

const COLLECTION_NAMES = {
    USERS: "expense-tracker-users",
    TRANSACTIONS: "transactions",
    CATEGORIES: "categories",
    BUSINESS: "business"
}

const EVENT_NAMES = {
    TRANSACTION_CREATED: "transaction_created",
}

const JWT_SECRET = "Bokakhat@123";

const AUTH_TOKEN_HEADER_FIELD = "token";

const PASSWORD_SALT = "Bokakhat@123";

module.exports = {
    MONGOURI,
    DB_NAME,
    APP_PORT,
    COLLECTION_NAMES,
    EVENT_NAMES,
    JWT_SECRET,
    AUTH_TOKEN_HEADER_FIELD,
    PASSWORD_SALT
}
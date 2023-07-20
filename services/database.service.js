const mongodb = require("mongodb");
const config = require("../config");

const client = new mongodb.MongoClient(config.MONGOURI);

let database = null;

async function initialize() {
    await client.connect();

    database = client.db(config.DB_NAME);
}

function getCollection(collectioName) {
    return database.collection(collectionName);
}

module.exports = {
    initialize,
    getCollection
};
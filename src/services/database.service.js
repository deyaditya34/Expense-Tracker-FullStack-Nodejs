const config = require("../config")
const mongodb = require("mongodb");

const client = new mongodb.MongoClient(config.MONGODBURI);

let database = null;

async function initialize() {
    await client.connect();
    
    database = client.db(config.DB_NAME);
}

function getCollection(collectionName) {
    return database.collection(collectionName);
}

module.exports = {
    initialize,
    getCollection
};


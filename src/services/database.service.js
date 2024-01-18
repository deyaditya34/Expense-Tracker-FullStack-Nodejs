const mongodb = require("mongodb");
const env = require("../middlewares/env-resolver")

const client = new mongodb.MongoClient(env.result.MONGODBURI);

let database = null;

async function initialize() {
    await client.connect();
    
    database = client.db(env.result.DB_NAME);
}

function getCollection(collectionName) {
    return database.collection(collectionName);
}

module.exports = {
    initialize,
    getCollection
};


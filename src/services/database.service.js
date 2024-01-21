const mongodb = require("mongodb");
// const env = require("../middlewares/env-resolver")

const client = new mongodb.MongoClient(process.env.MONGODBURI);

let database = null;

async function initialize() {
    await client.connect();
    
    database = client.db(process.env.DB_NAME);
}

function getCollection(collectionName) {
    return database.collection(collectionName);
}

module.exports = {
    initialize,
    getCollection
};


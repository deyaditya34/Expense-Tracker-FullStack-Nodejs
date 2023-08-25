const database = require("../services/database.service");
const {COLLECTION_NAMES} = require("../config");

function getBusiness() {
  return database
    .getCollection(COLLECTION_NAMES.BUSINESS)
    .find({})
    .toArray()
}


module.exports = getBusiness;
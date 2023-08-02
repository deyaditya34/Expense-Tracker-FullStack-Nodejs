const buildApiHandler = require("../api-utils/build-api-handler");
const userResolver = require("../middlewares/user-resolver");
const {getAllCategories} = require("./categories.service");
const pagination = require("../middlewares/pagination");

async function controller(req, res) {
  const {pageNo, limit} = req.query;
 const skipList = parseInt(pageNo);
 const limitList = parseInt(limit);

  let result = await getAllCategories(skipList, limitList);
  
  if (!result) {
    res.json({
      message: "No categories stored in the application to display"
    })
  } else {
    res.json({
      message: "Displayed categories below",
      data: result,
    })
  }
}

module.exports = buildApiHandler([userResolver, pagination, controller]);
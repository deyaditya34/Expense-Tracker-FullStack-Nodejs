const dotenv = require("dotenv");

const env = dotenv.config({path : "C:\\Users\\user\\Documents\\Programs\\ExpenseTracker\\src\\process.env"})

if (env.error) {
  throw env.error
}

module.exports = {
  result : env.parsed
}
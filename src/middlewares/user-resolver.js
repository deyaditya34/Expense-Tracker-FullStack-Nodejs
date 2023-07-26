const httpError = require("http-errors");
const {AUTH_TOKEN_HEADER_FIELD} = require("../config");
const {getUserFromToken} = require("../authorisation/auth.service");


async function userResolver(req, res, next) {
  const token = Reflect.get(req.headers, AUTH_TOKEN_HEADER_FIELD);

  if(!token) {
    throw new httpError.Forbidden("Access Denied");
  }

  const user = await getUserFromToken(token);

  if(!user) {
    throw new httpError.Forbidden("Invalid Token");
  }
  console.log("User is", user);
  Reflect.set(req.body, "createdBy", user);
  Reflect.set(req.body, "createdAt", new Date());
  next();
}

module.exports = userResolver;
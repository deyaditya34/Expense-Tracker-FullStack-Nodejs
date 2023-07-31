const httpError = require("http-errors");
const {AUTH_TOKEN_HEADER_FIELD} = require("../config");
const {getUserFromToken} = require("../auth/auth.service");


async function userResolver(req, res, next) {
  const token = Reflect.get(req.headers, AUTH_TOKEN_HEADER_FIELD);

  if(!token) {
    throw new httpError.Forbidden("Access Denied");
  }

  const user = await getUserFromToken(token);

  if(!user) {
    throw new httpError.Forbidden("Invalid Token");
  }

  Reflect.set(req.body, "user", user);
  
  next();
}

module.exports = userResolver;
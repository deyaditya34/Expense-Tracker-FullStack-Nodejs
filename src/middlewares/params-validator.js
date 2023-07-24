const httpError = require("http-errors");

const createParamValidator = (params, paramsKey) => (req, res, next) => {
  const reqParams = Reflect.get(req, paramsKey);
  const missingParams = params.filter(
    (param) => !Reflect.has(reqParams, param)
    );

  if (missingParams.length > 0) {
    throw httpError.BadRequest(
      `Required fields '${missingParams.join(
        ", "
      )}' are missing from '${paramsKey}'`
    );
  }

  next();
};

const PARAM_KEY = {
    BODY: "body",
    QUERY: "query"
};

module.exports = {
    createParamValidator,
    PARAM_KEY
}

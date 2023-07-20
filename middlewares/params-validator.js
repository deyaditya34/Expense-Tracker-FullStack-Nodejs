const httpError = require("http-errors");

const createParamValidator = (params, paramskey) => (req, res, next) => {
  const reqParams = Reflect.get(req, paramskey);

  const missingParams = params.filter(
    (field) => !Reflect.has(reqParams, params)
  );

  if (missingParams.length > 0) {
    throw httpError.BadRequest(
      `Required fields '${missingParams.join(
        ","
      )}' are missing from '${paramKey}'`
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

const httpError = require("http-errors");

function pagination(req, res, next) {
  const { pageNo, limit } = req.query;
  if (pageNo) {
    // if (typeof pageNo !== "number") {
    //   throw new httpError.BadRequest(`Field '${pageNo}' should be 'number' type`)
    // }

    if (pageNo > 100) {
      throw new httpError.BadRequest(
        `Field '${pageNo} should be lesser than '100'`
      );
    }

    if (pageNo < 1) {
      throw new httpError.BadRequest(
        `Field '${pageNo}' should be greater than '0'`
      );
    }
  }

  if (limit) {
    // if (typeof limit !== "number") {
    //   throw new httpError.BadRequest(`Field ${limit} should be 'number' type`);
    // }

    if (limit >= 20) {
      throw new httpError.BadRequest(`Field ${limit} should be lesser than or equal to '20'`);
    }

    if (limit < 1) {
      throw new httpError.BadRequest(`Field ${limit} should be greater than or equal to '1'`)
    }
  }

  if (!pageNo) {
    Reflect.set(req.query, "pageNo", 1);
  }

  if (!limit) {
    Reflect.set(req.query, "limit", 10);
  }

  next();
}

module.exports = pagination;

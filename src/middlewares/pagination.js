const httpError = require("http-errors");

function pagination(req, res, next) {
  const { pageNo, pageSize } = req.query;
  
  if (pageNo) {
    let pageNumber = parseInt(pageNo);

    if (Number.isNaN(pageNumber) === true) {
      throw new httpError.BadRequest(
        "Invalid 'Field' - 'Page Number'. It supports only numbers."
      );
    }

    if (pageNumber > 100) {
      throw new httpError.BadRequest(
        `Field '${pageNo} should be lesser than '100'`
      );
    }

    if (pageNumber < 1) {
      throw new httpError.BadRequest(
        `Field '${pageNo}' should be greater than '0'`
      );
    }

    Reflect.set("req.query", "pageNo", pageNumber);
  }

  if (pageSize) {
    let pageSz = parseInt(pageSize);

    if (Number.isNaN(pageSz) === true) {
      throw new httpError.BadRequest(
        "Invalid 'Field' - 'Page Size'. It supports only numbers."
      );
    }

    if (pageSize >= 20) {
      throw new httpError.BadRequest(
        `Field ${limit} should be lesser than or equal to '20'`
      );
    }

    if (pageSize < 1) {
      throw new httpError.BadRequest(
        `Field ${limit} should be greater than or equal to '1'`
      );
    }

    Reflect.set("req.query", "pageSize", pageSz);
  }

  if (!pageNo) {
    Reflect.set(req.query, "pageNo", 1);
  }

  if (!pageSize) {
    Reflect.set(req.query, "pageSize", 10);
  }

  next();
}

module.exports = pagination;



const httpError = require("http-errors");

function errorHandler (err, req, res, next) {
    console.log("[api error]:", err);

    res.status(getErrorCode(err)).json({
        success: false,
        error: getErrorMessage(err)
    })
}

function getErrorCode(err) {
    return err.statusCode || httpError.InternalServerError().statusCode;
}

function getErrorMessage(err) {
    return err.message || httpError.InternalServerError().message;
}


module.exports = errorHandler;
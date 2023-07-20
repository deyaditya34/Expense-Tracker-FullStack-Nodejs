async function requestLogger(req, res, next) {
  const { url, method } = req;

  const timestampStart = Date.now();
  res.on("close", () => {
    /**
     * This event is fired by Express when response finishes
     */
    const timestampEnd = Date.now();
    const responseTime = timestampEnd - timestampStart;

    console.log(`[api]: ${method} ${url} - ${res.statusCode} - ${responseTime}ms`);
  });

  next();
}

module.exports = requestLogger;

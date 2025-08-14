function buildApiHandler(handlers = []) {
  return handlers.map((handlerFn) => wrapErrorHandling(handlerFn));
}

const wrapErrorHandling = (apiHandler) => async (req, res, next) => {
  try {
    await apiHandler(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = buildApiHandler;


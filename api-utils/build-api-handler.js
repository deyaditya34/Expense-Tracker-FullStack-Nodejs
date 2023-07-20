function buildApiHandler(controller, validatorChain = []) {
  return [
    ...validatorChain.map((validatorFn) => wrapErrorHandling(validatorFn)),
    wrapErrorHandling(controller),
  ];
}

const wrapErrorHandling = (apiHandler) => async (req, res, next) => {
  try {
    await apiHandler(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = buildApiHandler;

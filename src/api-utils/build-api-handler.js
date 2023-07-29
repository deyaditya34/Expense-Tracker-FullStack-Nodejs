/**
 * @fix merge both params into a single one.
 * Maybe something like `handlers = []`
 */
function buildApiHandler(controller = [], validatorChain = []) {
  return [
    ...validatorChain.map((validatorFn) => wrapErrorHandling(validatorFn)),
    ...controller.map((validatorFn) => wrapErrorHandling(validatorFn)),
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

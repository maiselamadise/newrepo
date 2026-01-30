// controllers/errorController.js
exports.triggerError = (req, res, next) => {
  try {
    throw new Error("Intentional 500 error for testing");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

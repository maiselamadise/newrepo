// middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  // Log stack trace for debugging
  console.error(err.stack);

  // Customize response depending on environment
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      message: "Internal Server Error",
    });
  } else {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
}

module.exports = errorHandler;

// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500);
  res.render("errors/error", {
    title: err.status || 500,
    message: err.message || "Something went wrong",
  });
};

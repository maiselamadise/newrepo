function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Error ${status}</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <main>
        <h1>Error ${status}</h1>
        <p>${err.message || "Internal Server Error"}</p>
      </main>
    </body>
    </html>
  `);
}

module.exports = errorHandler;

// Home
app.get("/", (req, res) => {
  res.render("index"); // or sendFile if using static HTML
});

// Vehicles
app.get("/vehicles/custom", (req, res) => {
  res.render("custom");
});

app.get("/vehicles/sedan", (req, res) => {
  res.render("sedan");
});

app.get("/vehicles/suv", (req, res) => {
  res.render("suv");
});

app.get("/vehicles/truck", (req, res) => {
  res.render("truck");
});

// Account
app.get("/account/login", (req, res) => {
  res.render("login");
});

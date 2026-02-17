const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');

const { setLocals } = require('./middleware/auth');
const accountsRouter = require('./routes/accounts');
const inventoryRouter = require('./routes/inventory');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash());

// Custom middleware
app.use(setLocals);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/account', accountsRouter);
app.use('/inventory', inventoryRouter);

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

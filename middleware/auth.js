const jwt = require('jsonwebtoken');

function authorizeInventory(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.redirect('/account/login');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.account_type === 'Employee' || payload.account_type === 'Admin') {
      res.locals.loggedIn = true;
      res.locals.firstName = payload.firstname;
      res.locals.account_type = payload.account_type;
      return next();
    }
    req.flash('error', 'Unauthorized access');
    return res.redirect('/account/login');
  } catch (err) {
    return res.redirect('/account/login');
  }
}

function setLocals(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.loggedIn = true;
      res.locals.firstName = payload.firstname;
      res.locals.account_type = payload.account_type;
    } catch {
      res.locals.loggedIn = false;
    }
  } else {
    res.locals.loggedIn = false;
  }
  next();
}

module.exports = { authorizeInventory, setLocals };

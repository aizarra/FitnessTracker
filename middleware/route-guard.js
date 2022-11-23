function isLoggedIn(req, res, next) {
  // Check if user is logged in
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }

  // User is logged in => Open requested page
  next();
}

module.exports = {
  isLoggedIn,
};

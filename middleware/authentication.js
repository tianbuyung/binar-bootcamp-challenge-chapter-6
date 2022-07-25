const checkAuthentication = (req, res, next) => {
  const session = req.session;
  if (session.username) {
    next();
  } else {
    res.redirect("/users/login");
  }
};

module.exports = checkAuthentication;

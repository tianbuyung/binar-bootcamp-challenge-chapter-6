const checkRoleSuperAdmin = (req, res, next) => {
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.redirect("/game");
  }
};

module.exports = checkRoleSuperAdmin;

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";

const checkAuthentication = (req, res, next) => {
  let token = req.cookies.token;
  let error = null;
  if (!token) {
    error = "You need login because the session is expired.";
    return res.render("pages/error", {
      title: "Error",
      message: error,
      error: error,
    });
  } else {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        return res.render("pages/error", {
          title: "Error",
          message: "Token not valid",
          error: err,
        });
      }
      req.user = decoded;
      next();
    });
  }
};

module.exports = checkAuthentication;

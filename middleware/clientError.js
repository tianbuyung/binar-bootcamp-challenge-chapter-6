const createError = require("http-errors");

// catch 404 and forward to error handler
const errorNotFound = (req, res, next) => {
  next(createError(404));
};

module.exports = {
  errorNotFound,
};

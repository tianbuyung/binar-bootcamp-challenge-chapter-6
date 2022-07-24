require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/indexRoute");
const gameRouter = require("./routes/gameRoute");
const usersRouter = require("./routes/usersRoute");
const adminRouter = require("./routes/adminRoute");
const usersApiRouter = require("./routes/usersApiRoute");

const clientError = require("./middleware/clientError");
const serverError = require("./middleware/serverError");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/game", gameRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/api/users", usersApiRouter);

// catch 404 and forward to error handler
app.use(clientError.errorNotFound);
// error handler
app.use(serverError.server);

module.exports = app;

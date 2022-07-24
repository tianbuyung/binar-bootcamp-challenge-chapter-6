var express = require("express");
var router = express.Router();
const UserGame = require("../controllers/UserGameController");
const userGame = new UserGame();

/* Create a new user. */
router.post("/", userGame.createUserGame);
/* GET users listing. */
router.get("/", userGame.getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();

const GameController = require("../controllers/gameController");
const gameController = new GameController();

const gameAuth = require("../middleware/authentication");

/* GET game page. */
router.get("/", gameAuth, gameController.getGamePage);

module.exports = router;

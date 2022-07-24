const express = require("express");
const router = express.Router();

const GameController = require("../controllers/gameController");
const gameController = new GameController();

/* GET game page. */
router.get("/", gameController.getGamePage);

module.exports = router;

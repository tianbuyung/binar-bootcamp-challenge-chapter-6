const express = require("express");
const router = express.Router();

const GameController = require("../controllers/gameController");
const gameController = new GameController();

const userAuth = require("../middleware/authentication");

/* GET game page. */
router.get("/", userAuth, gameController.getGamePage);
/* POST game result. */
router.post("/", userAuth, gameController.storeGame);

module.exports = router;

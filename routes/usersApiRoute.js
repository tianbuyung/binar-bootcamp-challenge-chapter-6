var express = require("express");
var router = express.Router();
const UserGame = require("../controllers/usersApiController");
const userGame = new UserGame();

const userAuth = require("../middleware/authentication");

/* Create a new user. */
router.post("/", userAuth, userGame.createUserGame);
/* GET users listing. */
router.get("/", userAuth, userGame.getAllUsers);
/* GET a user listing by ID. */
router.get("/:id", userAuth, userGame.getUserById);
/* Edit users by ID. */
router.put("/:id", userAuth, userGame.updateUserById);
/* Delete users by ID. */
router.delete("/:id", userAuth, userGame.deleteUserById);

module.exports = router;

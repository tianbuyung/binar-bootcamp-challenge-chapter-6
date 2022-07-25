var express = require("express");
var router = express.Router();
const UserGame = require("../controllers/usersApiController");
const userGame = new UserGame();

/* Create a new user. */
router.post("/", userGame.createUserGame);
/* GET users listing. */
router.get("/", userGame.getAllUsers);
/* GET a user listing by ID. */
router.get("/:id", userGame.getUserById);
/* Edit users by ID. */
router.put("/:id", userGame.updateUserById);
/* Delete users by ID. */
router.delete("/:id", userGame.deleteUserById);

module.exports = router;

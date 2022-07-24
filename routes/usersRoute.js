const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");

const usersController = new UsersController();

// GET register page
router.get("/register", usersController.getRegisterPage);
// GET login page
router.get("/login", usersController.getLoginPage);
// POST create new user
router.post("/register", usersController.createNewUser);
// POST login user
router.post("/login", usersController.loginUser);

module.exports = router;

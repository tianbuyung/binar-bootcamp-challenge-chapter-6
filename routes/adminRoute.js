const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");
const adminController = new AdminController();

const userAuth = require("../middleware/authentication");
const adminAuth = require("../middleware/userRole");

// GET dashboard page
router.get("/", userAuth, adminAuth, adminController.getDashboardPage);
// POST create new user
router.post("/", userAuth, adminAuth, adminController.createUserGame);
// POST edit user data
router.post("/edit/:id", userAuth, adminAuth, adminController.updateUserById);
// GET edit user data
router.get("/edit/:id", userAuth, adminAuth, adminController.getEditPage);
// GET delete user data
router.get("/delete/:id", userAuth, adminAuth, adminController.deleteUserById);
// GET view page
router.get("/:id", userAuth, adminAuth, adminController.viewUserById);

module.exports = router;

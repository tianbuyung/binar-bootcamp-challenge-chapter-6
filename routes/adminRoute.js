const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");
const adminController = new AdminController();

const adminAuth = require("../middleware/authentication");

// GET dashboard page
router.get("/", adminAuth, adminController.getDashboardPage);
// POST create new user
router.post("/", adminAuth, adminController.createUserGame);
// POST edit user data
router.post("/edit/:id", adminAuth, adminController.updateUserById);
// GET edit user data
router.get("/edit/:id", adminAuth, adminController.getEditPage);
// GET delete user data
router.get("/delete/:id", adminAuth, adminController.deleteUserById);
// GET view page
router.get("/:id", adminAuth, adminController.viewUserById);

module.exports = router;

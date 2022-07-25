const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");
const adminController = new AdminController();

const adminAuth = require("../middleware/authentication");

// GET dashboard page
router.get("/", adminAuth, adminController.getDashboardPage);
// GET view page
router.get("/:id", adminAuth, adminController.viewUserById);

module.exports = router;

const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

const adminController = new AdminController();

// GET register page
router.get("/", adminController.getDashboardPage);

module.exports = router;

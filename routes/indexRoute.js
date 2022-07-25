const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/indexController");
const indexController = new IndexController();

/* GET home page. */
router.get("/", indexController.getHomePage);

module.exports = router;

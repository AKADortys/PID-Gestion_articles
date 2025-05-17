const mainController = require("../controllers/main.controller");
const express = require("express");
const router = express.Router();

router.get("", mainController.renderMain);

module.exports = router;

const express = require("express");
const router = express.Router();

const getHomePage = require("../controllers/global.controller");

router.get("/", getHomePage);

module.exports = router;
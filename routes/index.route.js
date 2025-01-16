const express = require("express");
const router = express.Router();

const getHomePage = require("../controllers/global.controller");
const { strictNoAuth } = require("../middleware/auth.middleware")

router.get("/", strictNoAuth, getHomePage);

module.exports = router;
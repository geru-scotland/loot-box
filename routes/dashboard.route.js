const express = require("express");
const router = express.Router();

const { dashboardController } = require("../controllers/dashboard.controller");
const { requiresAuth } = require("../middleware/auth.middleware");

router.get("/", requiresAuth, dashboardController);

module.exports = router;
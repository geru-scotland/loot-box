const express = require("express");
const router = express.Router();

const { requiresAdmin } = require("../middleware/auth.middleware");
const { addItemController } = require("../controllers/admin.controller");

router.get("/:rid?", requiresAdmin, addItemController);

module.exports= router;
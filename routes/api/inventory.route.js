const express = require("express")
const router = express.Router()

const { requiresAuth } = require("../../middleware/auth.middleware");
const { addItemInventoryController } = require("../../controllers/inventory.controller")

router.post("/inventory/items/:itemid", requiresAuth, addItemInventoryController);

module.exports = router;
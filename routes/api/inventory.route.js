const express = require("express")
const router = express.Router()

const { requiresAuth } = require("../../middleware/auth.middleware");
const { addItemInventoryController, resetInventoryController } = require("../../controllers/inventory.controller")

router.post("/inventory/items/:itemid", requiresAuth, addItemInventoryController);

router.post("/inventory/reset", requiresAuth, resetInventoryController);

module.exports = router;
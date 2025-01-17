const express = require("express")
const router = express.Router()

const { requiresAuth } = require("../../middleware/auth.middleware");
const { addItemInventoryController } = require("../../controllers/inventory.controller")

// El cliente envia ésta información, el item se genera en cliente
router.post("/inventory/:id/items/:itemid", requiresAuth, addItemInventoryController);

module.exports = router;
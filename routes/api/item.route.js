const express = require("express");
const router = express.Router()

const { rngItemController, createItemController } = require("../../controllers/item.controller");
const { requiresAuth, requiresAdmin } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/multer.middleware")

router.get("/items/generate/rng", requiresAuth, rngItemController);

router.post("/items", requiresAdmin, upload.single("itemImage"), createItemController);

module.exports = router;
const express = require("express");
const router = express.Router();

const { addItemController } = require("../controllers/admin.controller");
const { requiresAdmin } = require("../middleware/auth.middleware")

router.get("/", requiresAdmin, (req, res) => {
    res.render("admin/add-items");
})

router.post("/add-item", requiresAdmin, /*updload middleware ,*/ addItemController);

module.exports= router;
const express = require("express");
const router = express.Router();

const { requiresAdmin } = require("../middleware/auth.middleware")

router.get("/", requiresAdmin, (req, res) => {
    res.render("admin/add-items");
})

module.exports= router;
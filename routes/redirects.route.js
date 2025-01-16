const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.redirect("/auth/login");
});

router.get("/register", (req, res) => {
    res.redirect("/auth/register");
});

module.exports = router;

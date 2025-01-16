const express = require("express");
const router = express.Router();

const { loginController, registerController, logoutController}  = require("../controllers/auth.controller");
const { requiresAuth, strictNoAuth } = require("../middleware/auth.middleware");

// TODO: Falta middleware check para las rutas

router.get("/login", strictNoAuth, (req, res) => {
    return res.status(200).render("login");
});

router.get("/register", strictNoAuth, (req, res) => {
    return res.status(200).render("register");
});

router.get("/logout", requiresAuth, logoutController);

router.post("/register", strictNoAuth, registerController);
router.post("/login", strictNoAuth, loginController);

module.exports = router
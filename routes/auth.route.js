const express = require("express");
const router = express.Router();

const { loginController, logoutController} = require("../controllers/auth.controller");
const { createUserController } = require("../controllers/user.controller");
const { requiresAuth, strictNoAuth } = require("../middleware/auth.middleware");

// TODO: Falta middleware check para las rutas

router.get("/login", strictNoAuth, (req, res) => {
    return res.status(200).render("login");
});

router.get("/register", strictNoAuth, (req, res) => {
    return res.status(200).render("register");
});

router.get("/logout", requiresAuth, logoutController);

router.post("/register", strictNoAuth, createUserController);
router.post("/login", strictNoAuth, loginController);

module.exports = router
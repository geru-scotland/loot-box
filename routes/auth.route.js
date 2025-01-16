const express = require("express");
const router = express.Router();

const { loginController, registerController, createAccountController, logoutController}  = require("../controllers/auth.controller");
const { requiresAuth, strictNoAuth } = require("../middleware/auth.middleware");

// TODO: Falta middleware check para las rutas

router.get("/login", strictNoAuth, loginController);
router.get("/register", strictNoAuth, registerController);
router.get("/logout", requiresAuth, logoutController);

router.post("/register", strictNoAuth, createAccountController);

module.exports = router
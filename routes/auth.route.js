const express = require("express")
const router = express.Router()

const { loginController, registerController}  = require("../controllers/auth.controller")

// TODO: Falta middleware check para las rutas

router.get("/login", loginController)
router.get("/register", registerController)

module.exports = router
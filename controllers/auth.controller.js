const routes = require("../routes/routes");

const loginController = (req, res) => {
    res.render("login", { routes: routes });
}

const registerController = (req, res) => {
    res.render("register", { routes: routes });
}

const createAccountController = (req, res) => {
    console.log("Creando cuenta...");
}

module.exports = {
    loginController,
    registerController,
    createAccountController
}
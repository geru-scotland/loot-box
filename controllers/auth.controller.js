
const loginController = (req, res) => {
    res.render("login")
}

const registerController = (req, res) => {
    res.render("register")
}

module.exports = {
    loginController,
    registerController
}
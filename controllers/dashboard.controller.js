const { roles } = require("../constants/shared")

const dashboardController = (req, res) => {
    const user = {
        isAdmin: req.session.user.role === roles.ADMIN,
        username: req.session.user.username,
    }

    res.render("dashboard", { user: user });
}

module.exports = {
    dashboardController
}
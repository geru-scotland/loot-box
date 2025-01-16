const routes = require("../routes/routes")

const dashboardController = (req, res) => {
    res.render("dashboard", { routes: routes })
}

module.exports = {
    dashboardController
}
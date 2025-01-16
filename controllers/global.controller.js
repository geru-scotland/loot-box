const { homepage } = require("../constants/strings");
const routes = require("../routes/routes");

const getHomePage = (req, res) => {
    // TODO: Si está autenticado, redireccionar a /dashboard
    res.render("index", { textData: homepage, routes: routes });
}

module.exports = getHomePage;
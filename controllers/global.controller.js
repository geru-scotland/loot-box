const { homepage } = require("../constants/strings");
const routes = require("../routes/routes");

const getHomePage = (req, res) => {
    return res.render("index", { textData: homepage, routes: routes });
}

module.exports = getHomePage;